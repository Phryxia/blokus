import classnames from 'classnames/bind'
import styles from '@styles/board.module.css'
import { Color } from '@model/index'

const cx = classnames.bind(styles)

interface CellProps {
  color?: Color
  highlightColor?: Color
  onClick(): void
}

export default function Cell({ color, onClick, highlightColor }: CellProps) {
  return (
    <div className={classnames(cx('cell'))}>
      <button className={classnames(cx('inner'), color)} onClick={onClick}>
        <div
          className={cx({
            highlighted: highlightColor,
            [highlightColor]: highlightColor,
          })}
        />
      </button>
    </div>
  )
}
