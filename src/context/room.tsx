import { AiDifficulty, AiOption } from '@utils/ai'
import { useEffect, useState, createContext, useContext } from 'react'
import { Player } from '../model'

interface RoomContextInterface {
  players: Player[]
  me?: Player
  isSingleMode: boolean
  addPlayer(
    name: string,
    position: number,
    aiDifficulty?: AiDifficulty,
    aiOption?: AiOption
  ): Player
  removePlayer(player: Player): void
  signIn(name: string, position: number): Promise<void>
}

const RoomContext = createContext<RoomContextInterface>(undefined)

export function useRoom() {
  return useContext(RoomContext)
}

export function RoomProvider({ children, isSingleMode }) {
  const [players, setPlayers] = useState<Player[]>([])
  const [me, setMe] = useState<Player | undefined>()

  function addPlayer(
    name: string,
    position: number,
    aiDifficulty?: AiDifficulty,
    aiOption?: AiOption
  ): Player {
    const newPlayer = {
      name,
      position,
      isAi: !!aiDifficulty,
      aiDifficulty,
      aiOption,
    }
    setPlayers([...players, newPlayer])
    return newPlayer
  }

  function removePlayer(player: Player): void {
    setPlayers(players.filter((p) => p !== player))
  }

  async function signIn(name: string, position: number): Promise<void> {
    setMe(addPlayer(name, position))
  }

  return (
    <RoomContext.Provider
      value={{
        players,
        me,
        isSingleMode,
        addPlayer,
        removePlayer,
        signIn,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
