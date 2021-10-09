import classnames from 'classnames/bind'
import styles from '@styles/board.module.css'
import { Color } from '@model/index'

const cx = classnames.bind(styles)

interface CellProps {
  color?: Color
  detail: CellDetail
  onClick(): void
}

export const enum CellDetail {
  BLANK,
  RESERVED,
  PREVIEW,
  ANCHOR,
}

export default function Cell({ color, onClick, detail }: CellProps) {
  return (
    <div className={classnames(cx('cell'))}>
      <button
        className={classnames(
          cx('inner', {
            highlighted:
              detail === CellDetail.PREVIEW || detail === CellDetail.ANCHOR,
            emphasize: detail === CellDetail.ANCHOR,
            [color]: color,
          }),
          color
        )}
        onClick={onClick}
      >
        {detail === CellDetail.ANCHOR && (
          <div className={classnames(cx('color-display'))} />
        )}
      </button>
    </div>
  )
}
