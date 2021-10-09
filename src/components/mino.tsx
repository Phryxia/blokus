import { Color, Mino } from '../model'
import classnames from 'classnames/bind'
import styles from '../styles/mino.module.css'
import { getSize } from '../model/minos'

const cx = classnames.bind(styles)

interface MinoProps {
  mino: Mino
  color?: Color
  cellSize: number
  cellSizeUnit?: string
  isBiased?: boolean // If it is true then it displays blocks within the boundary
}

export default function MinoComponent({
  mino,
  color = Color.RED,
  cellSize,
  cellSizeUnit = 'px',
  isBiased = false,
}: MinoProps) {
  const { width, height, xMin, yMin } = getSize(mino.shapes)
  const multiplier = isBiased ? 1 : 0
  return (
    <div
      className={cx('container')}
      style={{
        width: `${width * cellSize}${cellSizeUnit}`,
        height: `${height * cellSize}${cellSizeUnit}`,
      }}
    >
      {mino.shapes.map(({ x, y }) => (
        <div
          key={`${x}-${y}`}
          className={[cx('mino'), color].join(' ')}
          style={{
            width: `${cellSize}${cellSizeUnit}`,
            height: `${cellSize}${cellSizeUnit}`,
            transform: `translate(${
              (x - xMin * multiplier) * cellSize
            }${cellSizeUnit}, ${
              (y - yMin * multiplier) * cellSize
            }${cellSizeUnit})`,
          }}
        />
      ))}
    </div>
  )
}
