import classnames from 'classnames/bind'
import styles from '@styles/alert.module.css'

const cx = classnames.bind(styles)

interface SimpleNoticeProps {
  message: string
  style?: Record<string, string>
  classNames?: string[]
}

export default function SimpleNotice({
  message,
  style,
  classNames,
}: SimpleNoticeProps) {
  return (
    <div
      className={classnames(cx('container'), 'white', 'window', classNames)}
      style={style}
    >
      <p>{message}</p>
    </div>
  )
}
