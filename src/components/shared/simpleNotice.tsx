import classnames from 'classnames/bind'
import styles from '@styles/alert.module.css'
import { useNotice } from '@context/notice'

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
  const { close } = useNotice()

  return (
    <div
      className={classnames(
        cx('container', 'notice'),
        'white',
        'window',
        classNames
      )}
      style={style}
      onClick={() => close()}
    >
      <p>{message}</p>
    </div>
  )
}
