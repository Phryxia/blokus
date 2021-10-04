import { useState, createContext, useContext, useMemo, useEffect } from 'react'
import {
  BOARD_SIZE,
  Color,
  Coordinate,
  GameState,
  Mino,
  MinoPlacement,
  MinoTransform,
  Rotation,
} from '../model'
import { shuffle } from '../utils'
import { MINOS, transform } from '../model/minos'
import { useRoom } from '../context/room'
import { useNotice } from './notice'

interface GameContextInterface {
  gameState?: GameState
  gamePhase: GamePhase
  cellStates: CellState[][]
  myPlayerId: number // If I'm not in this game, -1.
  currentPlayerId?: number
  createGame(): void
  finishGame(): void
  resetGame(): void
  isPlaceable(playerId: number, placement: MinoPlacement): boolean
  getFeasiblePlacements(
    playerId: number,
    mino?: Mino,
    transform?: MinoTransform
  ): MinoPlacement[]
  place(playerId: number, placement: MinoPlacement): void
}

export const enum GamePhase {
  WAITING = 0,
  PLAYING = 1,
  FINISHED = 2,
}

export interface CellState {
  playerId?: number
  x: number
  y: number
}

export const GameContext = createContext<GameContextInterface>(undefined)

export function useGame(): GameContextInterface {
  return useContext(GameContext)
}

const dx = [-1, 1, 0, 0]
const dy = [0, 0, -1, 1]
const dxd = [-1, 1, 1, -1]
const dyd = [-1, -1, 1, 1]

export function GameProvider({ children }) {
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.WAITING)
  const [gameState, setGameState] = useState<GameState | undefined>()
  const { players, me } = useRoom()
  const { showNotice } = useNotice()

  const myPlayerId =
    gameState?.players.findIndex(
      (playerStatus) => playerStatus.player === me
    ) ?? -1

  // Create and start new game using current connected players
  function createGame(): void {
    const orders = shuffle([0, 1, 2, 3].slice(0, players.length))
    setGameState({
      iteration: 0,
      startTime: new Date(),
      players: orders
        .map((order) => players[order])
        .map((player, index) => ({
          playerId: index,
          player,
          color: [Color.BLUE, Color.YELLOW, Color.RED, Color.GREEN][index],
          remainMinos: [...MINOS],
          placements: [],
        })),
    })
    setGamePhase(GamePhase.PLAYING)
  }

  const cellStates = useMemo(() => {
    const result: CellState[][] = []

    // create empty grid
    for (let y = 0; y < BOARD_SIZE; ++y) {
      const row: CellState[] = []
      for (let x = 0; x < BOARD_SIZE; ++x) {
        row.push({ x, y })
      }
      result.push(row)
    }

    if (!gameState) return result

    // write every placement
    gameState.players.forEach(({ playerId, placements }) => {
      placements.forEach(
        ({ mino, position, rotation, isFlippedX, isFlippedY }) => {
          mino = transform(mino, { isFlippedX, isFlippedY, rotation })

          mino.shapes.forEach(({ x, y }) => {
            const absX = position.x + x
            const absY = position.y + y
            result[absY][absX].playerId = playerId
          })
        }
      )
    })

    return result
  }, [gameState])

  // Return whether given <placement> is possible for <playerId>
  function isPlaceable(
    playerId: number,
    { mino, position, isFlippedX, isFlippedY, rotation }: MinoPlacement
  ): boolean {
    if (!gameState || playerId === -1) return false

    mino = transform(mino, { isFlippedX, isFlippedY, rotation })

    // 보드 안에 있는지
    if (
      mino.shapes.some(
        ({ x, y }) => !isInBoard({ x: x + position.x, y: y + position.y })
      )
    ) {
      return false
    }

    // 시작인 경우, 모서리에만 놓을 수 있음
    if (gameState.players[playerId].placements.length === 0) {
      const { x: startX, y: startY } = getStartCorner(
        gameState.players[playerId].player.position
      )

      return mino.shapes.some(({ x, y }) => {
        return x + position.x === startX && y + position.y === startY
      })
    }

    // 나머지 일반적인 경우: 상하좌우에는 자신의 셀이 없어야 하고
    // 최소한 하나의 셀은 접점이 존재해야 한다. 또한 놓으려고 하는 자리에
    // 뭔가 있으면 안된다.
    return (
      !mino.shapes.some(({ x, y }) => {
        const nx = x + position.x
        const ny = y + position.y
        return cellStates[ny][nx].playerId !== undefined
      }) &&
      !mino.shapes.some(({ x, y }) => {
        for (let i = 0; i < 4; ++i) {
          const nx = x + position.x + dx[i]
          const ny = y + position.y + dy[i]

          if (
            isInBoard({ x: nx, y: ny }) &&
            cellStates[ny][nx].playerId === playerId
          )
            return true
        }
        return false
      }) &&
      mino.shapes.some(({ x, y }) => {
        for (let i = 0; i < 4; ++i) {
          const nx = x + position.x + dxd[i]
          const ny = y + position.y + dyd[i]

          if (
            isInBoard({ x: nx, y: ny }) &&
            cellStates[ny][nx].playerId === playerId
          )
            return true
        }
        return false
      })
    )
  }

  // Get <playerId>'s every possible placements
  // If <mino> is given, it only uses that given one.
  // If <transform> is specified, it only uses that transform.
  function getFeasiblePlacements(
    playerId: number,
    mino?: Mino,
    transform?: MinoTransform
  ): MinoPlacement[] {
    if (!gameState || playerId === -1) return []

    let result: MinoPlacement[] = []
    for (let y = 0; y < BOARD_SIZE; ++y) {
      for (let x = 0; x < BOARD_SIZE; ++x) {
        // For every position
        ;(mino ? [mino] : gameState.players[playerId].remainMinos).forEach(
          (baseMino) => {
            // If there is already given transform, try only using that
            if (transform) {
              const placement = {
                ...transform,
                mino: baseMino,
                position: { x, y },
              }

              if (isPlaceable(playerId, placement)) {
                result.push(placement)
              }
            }
            // try every possible transform
            else {
              ;[true, false].forEach((isFlippedX) => {
                ;[true, false].forEach((isFlippedY) => {
                  ;[0, 90, 180, 270].forEach((rotation: Rotation) => {
                    const placement = {
                      mino: baseMino,
                      position: { x, y },
                      isFlippedX,
                      isFlippedY,
                      rotation,
                    }

                    if (isPlaceable(playerId, placement)) {
                      result.push(placement)
                    }
                  })
                })
              })
            }
          }
        )
      }
    }

    return result
  }

  // Place <playerId>'s block using <placement>
  // If it is not possible to place it, do nothing.
  function place(playerId: number, placement: MinoPlacement): void {
    if (!gameState || playerId === -1 || !isPlaceable(playerId, placement))
      return

    setGameState({
      ...gameState,
      iteration: (gameState.iteration + 1) % gameState.players.length,
      players: gameState.players.map((playerStatus) => {
        if (playerStatus.playerId !== playerId) return playerStatus

        return {
          ...playerStatus,
          remainMinos: playerStatus.remainMinos.filter(
            (mino) => mino.name !== placement.mino.name
          ),
          placements: [...playerStatus.placements, placement],
        }
      }),
    })
  }

  function skip(): void {
    setGameState({
      ...gameState,
      iteration: (gameState.iteration + 1) % gameState.players.length,
    })
  }

  function finishGame(): void {
    setGamePhase(GamePhase.FINISHED)
    setGameState({
      ...gameState,
      endTime: new Date(),
    })
  }

  function resetGame(): void {
    setGamePhase(GamePhase.WAITING)
    setGameState(undefined)
  }

  const currentPlayerId = gameState?.iteration % gameState?.players.length

  // After for each player's turn
  useEffect(() => {
    if (!gameState || currentPlayerId === undefined) return

    const feasibles = gameState.players.map((playerStatus) =>
      getFeasiblePlacements(playerStatus.playerId)
    )

    // Everybody cannot place more
    if (!feasibles.some((possibilities) => possibilities.length > 0)) {
      finishGame()
      return
    }

    // Current player cannot place more
    if (feasibles[currentPlayerId].length === 0) {
      showNotice(
        "You don't have any placeable block.",
        5000,
        {
          width: '360px',
          height: '200px',
        },
        [gameState.players[currentPlayerId].color]
      )
      skip()
      return
    }

    if (gameState.players[currentPlayerId].player.isAi) {
      setTimeout(() => {
        console.log('do something')
      }, 500)
    }
  }, [currentPlayerId])

  return (
    <GameContext.Provider
      value={{
        gameState,
        gamePhase,
        cellStates,
        myPlayerId,
        currentPlayerId,
        createGame,
        finishGame,
        resetGame,
        isPlaceable,
        getFeasiblePlacements,
        place,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

function isInBoard({ x, y }: Coordinate): boolean {
  return 0 <= x && x < BOARD_SIZE && 0 <= y && y < BOARD_SIZE
}

function getStartCorner(position: number): Coordinate {
  switch (position) {
    case 0:
      return { x: 0, y: 0 }
    case 1:
      return { x: 0, y: BOARD_SIZE - 1 }
    case 2:
      return { x: BOARD_SIZE - 1, y: 0 }
    case 3:
      return { x: BOARD_SIZE - 1, y: BOARD_SIZE - 1 }
    default:
      return { x: -1, y: -1 }
  }
}
