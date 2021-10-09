import {
  GameState,
  Player,
  Color,
  MinoPlacement,
  BOARD_SIZE,
  Mino,
  Coordinate,
  MinoTransform,
  Rotation,
  PlayerGameState,
} from '@model/index'
import { MINOS, transform } from '@model/minos'
import { deepcopy, shuffle } from '@utils/index'

type Quadruple = [number, number, number, number]

const dx: Quadruple = [-1, 1, 0, 0]
const dy: Quadruple = [0, 0, -1, 1]
const dxd: Quadruple = [-1, 1, 1, -1]
const dyd: Quadruple = [-1, -1, 1, 1]

interface CellState {
  playerId?: number
  x: number
  y: number
}

export default class GameWorld {
  private players: Player[]
  private gameState: GameState
  private fullFeasibles: MinoPlacement[][] = []
  private cellStates: CellState[][]

  public constructor(players: Player[], private onGameFinished?: () => void) {
    this.players = players
    this.createEmptyCells()

    const orders = shuffle([0, 1, 2, 3].slice(0, this.players.length))

    this.gameState = {
      iteration: -1,
      startTime: new Date(),
      players: orders
        .map((order) => this.players[order])
        .map((player, index) => ({
          playerId: index,
          player,
          color: [Color.BLUE, Color.YELLOW, Color.RED, Color.GREEN][index],
          remainMinos: [...MINOS],
          placements: [],
          is1x1PlacedLast: false,
        })),
    }
    this.fullFeasibles = []
    this.nextTurn()
  }

  // Note that this doesn't copy onGameFinished callback
  public fork(onGameFinished?: () => void): GameWorld {
    const result = deepcopy(this)
    result.onGameFinished = onGameFinished
    Object.setPrototypeOf(result, GameWorld.prototype)
    return result
  }

  private createEmptyCells(): void {
    this.cellStates = []

    // create empty grid
    for (let y = 0; y < BOARD_SIZE; ++y) {
      const row: CellState[] = []
      for (let x = 0; x < BOARD_SIZE; ++x) {
        row.push({ x, y })
      }
      this.cellStates.push(row)
    }
  }

  private renderCellStates(): void {
    // write every placement
    this.gameState.players.forEach(({ playerId, placements }) => {
      placements.forEach(
        ({ mino, position, rotation, isFlippedX, isFlippedY }) => {
          mino = transform(mino, { isFlippedX, isFlippedY, rotation })

          mino.shapes.forEach(({ x, y }) => {
            const absX = position.x + x
            const absY = position.y + y
            this.cellStates[absY][absX].playerId = playerId
          })
        }
      )
    })
  }

  public isPlaceable(
    playerId: number,
    { mino, position, isFlippedX, isFlippedY, rotation }: MinoPlacement
  ): boolean {
    if (playerId === -1) return false

    mino = transform(mino, { isFlippedX, isFlippedY, rotation })

    // 보드 안에 있는지
    if (
      mino.shapes.some(
        ({ x, y }) => !GameWorld.isInBoard(x + position.x, y + position.y)
      )
    ) {
      return false
    }

    // 시작인 경우, 모서리에만 놓을 수 있음
    if (this.gameState.players[playerId].placements.length === 0) {
      const { x: startX, y: startY } = GameWorld.getStartCorner(
        this.gameState.players[playerId].player.position
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
        return this.cellStates[ny][nx].playerId !== undefined
      }) &&
      !this.isSomnMyBlockExistsAt(playerId, mino, position, dx, dy) &&
      this.isSomnMyBlockExistsAt(playerId, mino, position, dxd, dyd)
    )
  }

  private isSomnMyBlockExistsAt(
    playerId: number,
    mino: Mino,
    { x: xPos, y: yPos }: Coordinate,
    dx: Quadruple,
    dy: Quadruple
  ): boolean {
    return mino.shapes.some(({ x, y }) => {
      for (let i = 0; i < 4; ++i) {
        const nx = x + xPos + dx[i]
        const ny = y + yPos + dy[i]

        if (
          GameWorld.isInBoard(nx, ny) &&
          this.cellStates[ny][nx].playerId === playerId
        )
          return true
      }
      return false
    })
  }

  // Get <playerId>'s every possible placements
  // If <mino> is given, it only uses that given one.
  // If <transform> is specified, it only uses that transform.
  public getFeasiblePlacements(
    playerId: number,
    mino?: Mino,
    transform?: MinoTransform
  ): MinoPlacement[] {
    if (playerId === -1) return []

    let result: MinoPlacement[] = []
    for (let y = 0; y < BOARD_SIZE; ++y) {
      for (let x = 0; x < BOARD_SIZE; ++x) {
        // Branch cutting
        if (this.cellStates[y][x].playerId !== undefined) continue

        // For every position
        const targetMinos = mino
          ? [mino]
          : this.gameState.players[playerId].remainMinos

        targetMinos.forEach((baseMino) => {
          if (transform) {
            const placement = {
              mino: baseMino,
              position: { x, y },
              ...transform,
            }

            if (this.isPlaceable(playerId, placement)) {
              result.push(placement)
            }
          } else {
            baseMino.analysis.preTransformed.map((transformedMino) => {
              const placement = {
                mino: transformedMino,
                position: { x, y },
              }

              if (this.isPlaceable(playerId, placement)) {
                result.push(placement)
              }
            })
          }
        })
      }
    }

    return result
  }

  // Place <playerId>'s block using <placement>
  // If it is not possible to place it, do nothing.
  // This returns skipped players' id
  public place(playerId: number, placement: MinoPlacement): number[] {
    if (playerId === -1 || !this.isPlaceable(playerId, placement)) return

    const playerStatus = this.gameState.players[playerId]
    playerStatus.remainMinos = playerStatus.remainMinos.filter(
      (mino) => mino.name !== placement.mino.name
    )
    playerStatus.placements.push(placement)
    playerStatus.is1x1PlacedLast =
      playerStatus.remainMinos.length === 0 && placement.mino.name === '1x1'

    return this.nextTurn()
  }

  private finishGame(): void {
    this.gameState.endTime = new Date()
    this.onGameFinished?.()
  }

  private nextTurn(): number[] {
    this.renderCellStates()

    const skippedPlayers: number[] = []
    do {
      this.gameState.iteration =
        (this.gameState.iteration + 1) % this.gameState.players.length

      const currentPlayerId = this.getCurrentPlayerId()

      this.fullFeasibles[currentPlayerId] =
        this.getFeasiblePlacements(currentPlayerId)

      // Everybody cannot place more
      if (
        !this.fullFeasibles.some((possibilities) => possibilities.length > 0)
      ) {
        this.finishGame()
        return skippedPlayers
      }

      // Current player cannot place more
      if (this.fullFeasibles[currentPlayerId].length === 0) {
        skippedPlayers.push(currentPlayerId)
      } else {
        return skippedPlayers
      }
    } while (true)
  }

  public getCurrentPlayerId(): number {
    return this.gameState.iteration
  }

  public getCurrentPlayerStatus(): PlayerGameState {
    return this.gameState.players[this.getCurrentPlayerId()]
  }

  public getGameState(): GameState {
    return this.gameState
  }

  public getCellStates(): CellState[][] {
    return this.cellStates
  }

  public getFullFeasiblePlacements(): MinoPlacement[][] {
    return this.fullFeasibles
  }

  public static isInBoard(x: number, y: number): boolean {
    return 0 <= x && x < BOARD_SIZE && 0 <= y && y < BOARD_SIZE
  }

  public static getStartCorner(position: number): Coordinate {
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
}
