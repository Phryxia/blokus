import { useEffect, useState, createContext, useContext } from 'react'
import { Player } from '../model'

interface RoomContextInterface {
  players: Player[]
  me?: Player
  signIn(name: string): Promise<void>
}

const RoomContext = createContext<RoomContextInterface>(undefined)

export function useRoom() {
  return useContext(RoomContext)
}

export function RoomProvider({ children }) {
  const [players, setPlayers] = useState<Player[]>([])
  const [me, setMe] = useState<Player | undefined>()

  useEffect(() => {
    // Dummy
    setPlayers([
      {
        name: '구아악',
      },
      {
        name: '좌측하단',
      },
      {
        name: '바보',
      },
    ])
  }, [])

  async function signIn(name: string): Promise<void> {
    const newMe = {
      name,
    }

    setMe(newMe)
    setPlayers([...players, newMe])
  }

  return (
    <RoomContext.Provider
      value={{
        players,
        me,
        signIn,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
