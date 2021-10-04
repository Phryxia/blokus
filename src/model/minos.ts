import { Mino, MinoTransform, Rotation } from './'

export const MINOS: Mino[] = [
  // 1 x 1
  {
    name: '1x1I',
    shapes: [{ x: 0, y: 0 }],
    isSymmetricX: true,
    isSymmetricY: true,
    isRotationUseless: true,
  },
  // 1 x 2
  {
    name: '1x2I',
    shapes: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
    isSymmetricX: true,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 2 x 2 L shaped
  {
    name: '2x2L',
    shapes: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ],
    isSymmetricX: true,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 1 x 3
  {
    name: '1x3I',
    shapes: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
    ],
    isSymmetricX: true,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 2 x 2
  {
    name: '2x2box',
    shapes: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ],
    isSymmetricX: true,
    isSymmetricY: true,
    isRotationUseless: true,
  },
  // 2 x 3 T shape
  {
    name: '2x3T',
    shapes: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
    ],
    isSymmetricX: true,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 1 x 4
  {
    name: '1x4I',
    shapes: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
    isSymmetricX: true,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 2 x 3 L shape
  {
    name: '2x3L',
    shapes: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
    ],
    isSymmetricX: false,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 2 x 3 S shape
  {
    name: '2x3S',
    shapes: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
    isSymmetricX: false,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 2 x 4 L shape
  {
    name: '2x4L',
    shapes: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 0, y: 1 },
    ],
    isSymmetricX: false,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 3 x 3 T shape
  {
    name: '3x3T',
    shapes: [
      { x: 0, y: 0 },
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ],
    isSymmetricX: true,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 3 x 3 L shape
  {
    name: '3x3L',
    shapes: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ],
    isSymmetricX: true,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 2 x 4 S (2 + 3)
  {
    name: '2x4S',
    shapes: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    isSymmetricX: false,
    isSymmetricY: false,
    isRotationUseless: false,
  },
  // 3 x 3 S (2 + 1 + 2)
  {
    name: '3x3S',
    shapes: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 1 },
      { x: -1, y: -1 },
    ],
    isSymmetricX: false,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 1 x 5
  {
    name: '1x5I',
    shapes: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -2, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
    isSymmetricX: true,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 3 x 2 b shape
  {
    name: '3x2B',
    shapes: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
    ],
    isSymmetricX: false,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 3 x 3 w shape
  {
    name: '3x3W',
    shapes: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
    isSymmetricX: true,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 3 x 2 u shape
  {
    name: '3x2U',
    shapes: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 1 },
      { x: 1, y: 1 },
    ],
    isSymmetricX: true,
    isSymmetricY: true,
    isRotationUseless: false,
  },
  // 3 x 3 cross
  {
    name: '3x3+',
    shapes: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ],
    isSymmetricX: true,
    isSymmetricY: true,
    isRotationUseless: true,
  },
  // 3 x 3 f shape
  {
    name: '3x3f',
    shapes: [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 1 },
    ],
    isSymmetricX: false,
    isSymmetricY: false,
    isRotationUseless: false,
  },
  // 2 x 4 T shape
  {
    name: '2x4T',
    shapes: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
    ],
    isSymmetricX: false,
    isSymmetricY: true,
    isRotationUseless: false,
  },
]

export function getSize(mino: Mino): { width: number; height: number } {
  const { xMin, xMax, yMin, yMax } = mino.shapes.reduce(
    ({ xMin, xMax, yMin, yMax }, { x, y }) => {
      return {
        xMin: Math.min(xMin, x),
        xMax: Math.max(xMax, x),
        yMin: Math.min(yMin, y),
        yMax: Math.max(yMax, y),
      }
    },
    { xMin: 9999, xMax: -9999, yMin: 9999, yMax: -9999 }
  )
  return {
    width: xMax - xMin + 1,
    height: yMax - yMin + 1,
  }
}

export function rotate(mino: Mino, rotation: Rotation): Mino {
  let c
  let s
  switch (rotation) {
    case 0:
      c = 1
      s = 0
      break
    case 90:
      c = 0
      s = 1
      break
    case 180:
      c = -1
      s = 0
      break
    case 270:
      c = 0
      s = -1
      break
  }
  return {
    ...mino,
    shapes: mino.shapes.map(({ x, y }) => ({
      x: c * x - s * y,
      y: s * x + c * y,
    })),
  }
}

export function flipX(mino: Mino): Mino {
  return {
    ...mino,
    shapes: mino.shapes.map(({ x, y }) => ({ x: -x, y })),
  }
}

export function flipY(mino: Mino): Mino {
  return {
    ...mino,
    shapes: mino.shapes.map(({ x, y }) => ({ x, y: -y })),
  }
}

export function transform(mino: Mino, transform: MinoTransform): Mino {
  if (transform.isFlippedX) mino = flipX(mino)
  if (transform.isFlippedY) mino = flipY(mino)
  if (transform.rotation) mino = rotate(mino, transform.rotation)
  return mino
}
