import { AiDifficulty, AiOption } from '@utils/ai'

export interface Coordinate {
  x: number
  y: number
}

export type Rotation = 0 | 90 | 180 | 270

export const enum Color {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
  YELLOW = 'yellow',
  WHITE = 'white',
}

export interface Mino {
  name: string
  shapes: Coordinate[]
  isSymmetricX: boolean
  isSymmetricY: boolean
  isRotationUseless: boolean
}

export interface MinoTransform {
  rotation?: Rotation
  isFlippedX?: boolean
  isFlippedY?: boolean
}

// application order is xflip -> yflip -> rotation
export interface MinoPlacement extends MinoTransform {
  mino: Mino
  position: Coordinate
}

export interface Player {
  name: string
  isAi?: boolean
  position: number // left up: 0, left down: 1, right up: 2, right down: 3
  aiDifficulty?: AiDifficulty
  aiOption?: AiOption
}

export interface GameState {
  startTime: Date
  endTime?: Date
  players: PlayerGameState[]
  iteration: number // order[iterations] is current turn player
}

export interface PlayerGameState {
  playerId: number
  player: Player
  color: Color
  remainMinos: Mino[]
  placements: MinoPlacement[]
  is1x1PlacedLast: boolean
}

export const BOARD_SIZE = 20
