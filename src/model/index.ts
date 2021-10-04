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
}

export interface Mino {
  name: string
  shapes: Coordinate[]
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
}

export interface GameState {
  startTime: Date
  players: {
    playerId: number
    player: Player
    color: Color
    remainMinos: Mino[]
    placements: MinoPlacement[]
  }[]
  iteration: number // order[iterations] is current turn player
}

export const BOARD_SIZE = 20
