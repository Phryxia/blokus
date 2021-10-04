import classnames from 'classnames/bind'
import styles from '@styles/alert.module.css'

const cx = classnames.bind(styles)

interface SimpleAlertProps {
  message: string
  confirmMessage?: string
  onConfirm(): void
  width?: number
  height?: number
}

export default function SimpleAlert({
  message,
  confirmMessage,
  onConfirm,
  width = 320,
  height = 160,
}: SimpleAlertProps) {
  return (
    <div
      className={classnames(cx('container'), 'white', 'window')}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <p>{message}</p>
      <button onClick={onConfirm}>{confirmMessage ?? 'OK'}</button>
    </div>
  )
}
