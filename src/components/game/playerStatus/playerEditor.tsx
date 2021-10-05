import classnames from 'classnames/bind'
import styles from '@styles/game.module.css'
import { SyntheticEvent, useState } from 'react'
import { useRoom } from '@context/room'
import { Player } from '@model/index'

const cx = classnames.bind(styles)

interface PlayerCreatorInterface {
  position: number
  player?: Player
}

export default function PlayerEditor({
  position,
  player,
}: PlayerCreatorInterface) {
  const [name, setName] = useState<string>('')
  const [isAi, setIsAi] = useState<boolean>(false)
  const { addPlayer, removePlayer } = useRoom()

  function handleNameChange(event: SyntheticEvent<HTMLInputElement>): void {
    setName(event.currentTarget.value)
  }

  function handleConfirmClick(): void {
    addPlayer(name, position, isAi)
  }

  function handleDeleteClick(): void {
    removePlayer(player)
  }

  return (
    <div className={cx('player-creator-container')}>
      {player ? (
        <button onClick={handleDeleteClick}>DELETE PLAYER</button>
      ) : (
        <>
          <div className={cx('inputs')}>
            <input
              type="text"
              placeholder="player name"
              value={name}
              onChange={handleNameChange}
            />
            AI
            <input
              type="checkbox"
              checked={isAi}
              onChange={() => setIsAi(!isAi)}
            />
          </div>
          <button disabled={!name} onClick={handleConfirmClick}>
            ADD PLAYER
          </button>
        </>
      )}
    </div>
  )
}
