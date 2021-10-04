import SimpleNotice from '@components/shared/simpleNotice'
import { createContext, useContext, useState } from 'react'

interface NoticeContextInterface {
  showNotice(
    message: string,
    time: number,
    styles?: Record<string, string>,
    classNames?: string[]
  ): void
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

  function showNotice(
    message: string,
    time: number,
    style?: Record<string, string>,
    classNames?: string[]
  ): void {
    setMessage(message)
    setIsShown(true)
    setStyle(style)
    setClassNames(classNames)

    setTimeout(() => {
      setIsShown(false)
    }, time)
  }

  return (
    <NoticeContext.Provider value={{ showNotice }}>
      {children}
      {isShown && (
        <SimpleNotice message={message} style={style} classNames={classNames} />
      )}
    </NoticeContext.Provider>
  )
}
