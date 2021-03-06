import { dx, dy, dxd, dyd, CoordinateMap } from '@utils/index'
import { Coordinate, Mino, MinoTransform, Rotation } from './'

export const MINOS: Mino[] = [
  // 1 x 1
  {
    name: '1x1',
    shapes: [{ x: 0, y: 0 }],
  },
  // 1 x 2
  {
    name: '1x2I',
    shapes: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  },
  // 2 x 2 L shaped
  {
    name: '2x2L',
    shapes: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ],
  },
  // 1 x 3
  {
    name: '1x3I',
    shapes: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
    ],
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
  },
]
  // translate cells so that center should be (0, 0)
  .map((basicMino) => {
    const { xMin, width, yMin, height } = getSize(basicMino.shapes)
    const xCenter = Math.floor(width / 2)
    const yCenter = Math.floor(height / 2)

    return {
      name: basicMino.name,
      shapes: translate(basicMino.shapes, -xMin - xCenter, -yMin - yCenter),
      analysis: {
        width,
        height,
      },
    }
  })
  // create analysis
  .map((normalizedMino) => {
    const preTransformed: Mino[] = []

    const flips = [
      [false, false],
      [false, true],
      [true, false],
    ]
    const rotations: Rotation[] = [0, 90, 180, 270]

    flips.forEach(([isFlippedX, isFlippedY]) => {
      const flippedShape = matrixTransform(normalizedMino.shapes, [
        [isFlippedX ? -1 : 1, 0],
        [0, isFlippedY ? -1 : 1],
      ])

      rotations.forEach((rotation) => {
        const rotatedShape = matrixTransform(
          flippedShape,
          getRotationMatrix(rotation)
        )

        if (
          !preTransformed.some(({ shapes }) =>
            isEquivalent(shapes, rotatedShape)
          )
        ) {
          const { width, height } = getSize(rotatedShape)

          preTransformed.push({
            name: normalizedMino.name,
            shapes: rotatedShape,
            analysis: {
              width,
              height,
              preTransformed: [],
              anchors: getAnchors(rotatedShape),
              neighbors: getNeighbors(rotatedShape),
            },
          })
        }
      })
    })

    return {
      ...normalizedMino,
      analysis: {
        ...normalizedMino.analysis,
        preTransformed,
        anchors: getAnchors(normalizedMino.shapes),
        neighbors: getNeighbors(normalizedMino.shapes),
      },
    }
  })

function translate(
  coordinates: Coordinate[],
  xBias: number,
  yBias: number
): Coordinate[] {
  return coordinates.map(({ x, y }) => ({ x: x + xBias, y: y + yBias }))
}

function matrixTransform(
  coordinates: Coordinate[],
  matrix: number[][]
): Coordinate[] {
  return coordinates.map(({ x, y }) => ({
    x: matrix[0][0] * x + matrix[0][1] * y,
    y: matrix[1][0] * x + matrix[1][1] * y,
  }))
}

function getRotationMatrix(rotation: Rotation): number[][] {
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
  return [
    [c, -s],
    [s, c],
  ]
}

function normalize(coordinates: Coordinate[]): Coordinate[] {
  const { xMin, yMin } = getSize(coordinates)
  return translate(coordinates, -xMin, -yMin)
}

function isEquivalent(
  coordinatesA: Coordinate[],
  coordinatesB: Coordinate[]
): boolean {
  if (coordinatesA.length !== coordinatesB.length) return false

  coordinatesA = normalize(coordinatesA)
  coordinatesB = normalize(coordinatesB)

  const isReserved = new CoordinateMap<boolean>()

  coordinatesA.forEach(({ x, y }) => isReserved.set(x, y, true))
  return !coordinatesB.some(({ x, y }) => !isReserved.get(x, y))
}

function getAnchors(coordinates: Coordinate[]): Coordinate[] {
  const cells = new CoordinateMap<boolean>()
  const result: Coordinate[] = []

  coordinates.forEach((cell) => {
    cells.set(cell.x, cell.y, true)
  })

  // for each diagonal cells
  coordinates.forEach(({ x, y }) => {
    ;[0, 1, 2, 3].forEach((d) => {
      const nx = x + dxd[d]
      const ny = y + dyd[d]

      // there is a cell already or duplication
      if (
        cells.get(nx, ny) ||
        result.some(({ x: px, y: py }) => nx === px && ny === py)
      )
        return

      // adjacent cell check
      if (
        ![0, 1, 2, 3].some((dd) => {
          const mx = nx + dx[dd]
          const my = ny + dy[dd]

          if (cells.get(mx, my)) return true
        })
      ) {
        result.push({ x: nx, y: ny })
      }
    })
  })

  return result
}

function getNeighbors(coordinates: Coordinate[]): Coordinate[] {
  const cells = new CoordinateMap<boolean>()
  const result: Coordinate[] = []

  coordinates.forEach((cell) => {
    cells.set(cell.x, cell.y, true)
  })

  coordinates.forEach(({ x, y }) => {
    ;[0, 1, 2, 3].forEach((d) => {
      const nx = x + dx[d]
      const ny = y + dy[d]

      // there is a cell already or duplication
      if (
        cells.get(nx, ny) ||
        result.some(({ x: px, y: py }) => nx === px && ny === py)
      )
        return

      result.push({ x: nx, y: ny })
    })
  })

  return result
}

export function getSize(coordinates: Coordinate[]): {
  width: number
  height: number
  xMin: number
  yMin: number
} {
  const { xMin, xMax, yMin, yMax } = coordinates.reduce(
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
    xMin,
    yMin,
  }
}

export function rotate(mino: Mino, rotation: Rotation): Mino {
  if (rotation === 0) return mino

  const matrix = getRotationMatrix(rotation)

  return {
    ...mino,
    shapes: matrixTransform(mino.shapes, matrix),
    analysis: {
      ...mino.analysis,
      width:
        rotation === 90 || rotation === 270
          ? mino.analysis.height
          : mino.analysis.width,
      height:
        rotation === 90 || rotation === 270
          ? mino.analysis.width
          : mino.analysis.height,
      anchors: matrixTransform(mino.analysis.anchors, matrix),
      neighbors: matrixTransform(mino.analysis.neighbors, matrix),
    },
  }
}

export function flipX(mino: Mino): Mino {
  const matrix = [
    [-1, 0],
    [0, 1],
  ]

  return {
    ...mino,
    shapes: matrixTransform(mino.shapes, matrix),
    analysis: {
      ...mino.analysis,
      anchors: matrixTransform(mino.analysis.anchors, matrix),
      neighbors: matrixTransform(mino.analysis.neighbors, matrix),
    },
  }
}

export function flipY(mino: Mino): Mino {
  const matrix = [
    [1, 0],
    [0, -1],
  ]

  return {
    ...mino,
    shapes: matrixTransform(mino.shapes, matrix),
    analysis: {
      ...mino.analysis,
      anchors: matrixTransform(mino.analysis.anchors, matrix),
      neighbors: matrixTransform(mino.analysis.neighbors, matrix),
    },
  }
}

export function transform(mino: Mino, transform: MinoTransform): Mino {
  if (transform.isFlippedX) mino = flipX(mino)
  if (transform.isFlippedY) mino = flipY(mino)
  if (transform.rotation) mino = rotate(mino, transform.rotation)
  return mino
}
