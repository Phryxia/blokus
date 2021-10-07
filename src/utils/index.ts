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

export function deepcopy<T>(object: T): T {
  if (typeof object !== 'object') return object

  const result: Partial<T> = {}
  for (const key in object) {
    result[key] = deepcopy(object[key])
  }
  return result as T
}
