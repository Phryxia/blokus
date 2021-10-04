import classnames from 'classnames/bind'
import styles from '../../../styles/game.module.css'
import { Color, Mino } from '../../../model'
import MinoComponent from '../../mino'

const cx = classnames.bind(styles)

interface MinoButtonProps {
  mino: Mino
  isDisabled?: boolean
  color: Color
  onClick(mino: Mino): void
}

export default function MinoButton({
  mino,
  isDisabled,
  color,
  onClick,
}: MinoButtonProps) {
  return (
    <button
      disabled={isDisabled}
      onClick={() => onClick(mino)}
      className={cx('mino-button')}
    >
      <MinoComponent mino={mino} isBiased cellSize={20} color={color} />
    </button>
  )
}
