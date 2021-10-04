import { SelectedMinoProvider } from '@context/selectedMino'
import GameRoom from '../../components/game'
import { GameProvider } from '../../context/game'
import { RoomProvider } from '../../context/room'

export default function Game() {
  return (
    <RoomProvider>
      <GameProvider>
        <SelectedMinoProvider>
          <GameRoom />
        </SelectedMinoProvider>
      </GameProvider>
    </RoomProvider>
  )
}
