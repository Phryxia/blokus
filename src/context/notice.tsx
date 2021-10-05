import SimpleNotice from '@components/shared/simpleNotice'
import { createContext, useContext, useRef, useState } from 'react'

interface NoticeOption {
  style?: Record<string, string>
  classNames?: string[]
  onClose?(): void
}

interface NoticeContextInterface {
  showNotice(message: string, time: number, option?: NoticeOption): void
  close(): void
}

const NoticeContext = createContext<NoticeContextInterface>(undefined)

export function useNotice() {
  return useContext(NoticeContext)
}

export default function NoticeProvider({ children }) {
  const [message, setMessage] = useState<string>('')
  const [isShown, setIsShown] = useState<boolean>(false)
  const [style, setStyle] = useState<any>({})
  const [classNames, setClassNames] = useState<string[] | undefined>()
  const timerRef = useRef<NodeJS.Timer | undefined>(undefined)
  const onCloseRef = useRef<Function | undefined>()

  function showNotice(
    message: string,
    time: number,
    option: NoticeOption = {}
  ): void {
    const { style, classNames, onClose } = option

    if (timerRef.current) {
      clearTimeout(timerRef.current)
      onCloseRef.current?.()
    }

    setMessage(message)
    setIsShown(true)
    setStyle(style)
    setClassNames(classNames)
    onCloseRef.current = onClose

    timerRef.current = setTimeout(() => {
      setIsShown(false)
      onCloseRef.current?.()
      onCloseRef.current = undefined
      timerRef.current = undefined
    }, time)
  }

  function close(): void {
    if (timerRef.current) clearTimeout(timerRef.current)

    setIsShown(false)
    onCloseRef.current?.()
    onCloseRef.current = undefined
    timerRef.current = undefined
  }

  return (
    <NoticeContext.Provider value={{ showNotice, close }}>
      {children}
      {isShown && (
        <SimpleNotice message={message} style={style} classNames={classNames} />
      )}
    </NoticeContext.Provider>
  )
}
