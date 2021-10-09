import { Coordinate } from '@model/index'

export function randomInt(minValue: number, maxValue: number): number {
  return Math.floor(Math.random() * (maxValue - minValue) + minValue)
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array]

  for (let i = 0; i < (array.length * array.length) / 2; ++i) {
    const a = randomInt(0, array.length - 1)
    const b = randomInt(0, array.length - 1)

    const temp = result[a]
    result[a] = result[b]
    result[b] = temp
  }

  return result
}

export function getRandomElements<T>(array: T[], num: number): T[] {
  if (num <= 0) return []
  if (num === 1) return [array[randomInt(0, array.length - 1)]]
  return shuffle(array).slice(0, num)
}

export type Quadruple = [number, number, number, number]

export const dx: Quadruple = [-1, 1, 0, 0]
export const dy: Quadruple = [0, 0, -1, 1]
export const dxd: Quadruple = [-1, 1, 1, -1]
export const dyd: Quadruple = [-1, -1, 1, 1]

export function getKey(coordinate: Coordinate | number, y?: number): string {
  if (typeof coordinate === 'object') return `${coordinate.x}-${coordinate.y}`
  return `${coordinate}-${y}`
}
