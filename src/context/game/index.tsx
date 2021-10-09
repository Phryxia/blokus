import { useState, createContext, useContext, useRef } from 'react'
import {
  Coordinate,
  GameState,
  Mino,
  MinoPlacement,
  MinoTransform,
} from '@model/index'
import { useRoom } from '@context/room'
import { useNotice } from '@context/notice'
import GameWorld from './game'
import { CoordinateMap } from '@utils/index'

interface GameContextInterface {
  gameState?: GameState
  gamePhase: GamePhase
  cellStates?: CoordinateMap<CellState>
  currentPlayerId?: number
  fullFeasiblePlacements?: MinoPlacement[][] // [playerId][]
  updater: number // For each turn, this value will have random numbers so users can be noticed.
  createGame(): void
  resetGame(): void
  isPlaceable(
    playerId: number,
    placement: MinoPlacement,
    targetGameState?: GameState
  ): boolean
  getFeasiblePlacements(
    playerId: number,
    mino?: Mino,
    transform?: MinoTransform,
    targetGameState?: GameState
  ): MinoPlacement[]
  place(playerId: number, placement: MinoPlacement): void
  getAnchors(playerId: number): Coordinate[]
  gameWorld?: GameWorld // WARNING: This is mutable object so be careful to use this
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

export function GameProvider({ children }) {
  const gameRef = useRef<GameWorld | undefined>()
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.WAITING)
  const { players } = useRoom()
  const { showNotice, close } = useNotice()
  const [updater, setUpdater] = useState<number>(Math.random())

  const isPlayerWarned = useRef<boolean[]>([])

  // Create and start new game using current connected players
  function createGame(): void {
    gameRef.current = new GameWorld(players, () => {
      setGamePhase(GamePhase.FINISHED)
      close()
    })
    setGamePhase(GamePhase.PLAYING)
    isPlayerWarned.current = []
  }

  function isPlaceable(playerId: number, placement: MinoPlacement): boolean {
    return gameRef.current?.isPlaceable(playerId, placement) ?? false
  }

  function getFeasiblePlacements(
    playerId: number,
    mino?: Mino,
    transform?: MinoTransform
  ): MinoPlacement[] {
    return (
      gameRef.current?.getFeasiblePlacements(playerId, mino, transform) ?? []
    )
  }

  function place(playerId: number, placement: MinoPlacement): void {
    const skippedPlayerIds = gameRef.current?.place(playerId, placement) ?? []
    const notWarnedPlayers = skippedPlayerIds.filter(
      (playerId) => !isPlayerWarned.current[playerId]
    )

    notWarnedPlayers.forEach(
      (playerId) => (isPlayerWarned.current[playerId] = true)
    )

    if (notWarnedPlayers.length > 0) {
      showNotice(
        `${notWarnedPlayers
          .map(
            (playerId) =>
              gameRef.current?.getGameState().players[playerId].player.name ??
              ''
          )
          .join(', ')} ${
          notWarnedPlayers.length === 1 ? 'has' : 'have'
        } been skipped since they don't have any block to place`,
        5000000,
        {
          style: {
            width: '360px',
            height: '200px',
          },
        }
      )
    }

    setUpdater(Math.random())
  }

  function resetGame(): void {
    gameRef.current = undefined
    setGamePhase(GamePhase.WAITING)
  }

  function getAnchors(playerId: number): Coordinate[] {
    return gameRef.current?.getAnchors(playerId) ?? []
  }

  return (
    <GameContext.Provider
      value={{
        gameState: gameRef.current?.getGameState(),
        gamePhase,
        cellStates: gameRef.current?.getCellStates(),
        currentPlayerId: gameRef.current?.getCurrentPlayerId() ?? -1,
        fullFeasiblePlacements:
          gameRef.current?.getFullFeasiblePlacements() ?? [],
        createGame,
        resetGame,
        isPlaceable,
        getFeasiblePlacements,
        place,
        updater,
        gameWorld: gameRef.current,
        getAnchors,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
