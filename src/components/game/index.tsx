import classnames from 'classnames/bind'
import styles from '../../styles/game.module.css'
import PlayerStatus from './playerStatus'
import MyMinos from './myMinos'
import Board from './board'
import { useRoom } from '@context/room'
import SimpleAlert from '@components/shared/simpleAlert'
import { GamePhase, useGame } from '@context/game'
import { useState } from 'react'
import GameResult from './result'

const cx = classnames.bind(styles)

export default function GameRoom() {
  const [alertMessage, setAlertMessage] = useState<string>(
    'Welcome to the blokus!'
  )
  const { isSingleMode, players } = useRoom()
  const { createGame, gamePhase } = useGame()

  function handleStartClick(): void {
    if (players.length < 2) {
      setAlertMessage('Please add more than two players to start.')
      return
    }

    createGame()
  }

  return (
    <div className={cx('root')}>
      <div className={cx('upper-display')}>
        <div className={cx('players-container')}>
          <PlayerStatus position={0} />
          <PlayerStatus position={1} />
        </div>
        <div className={cx('board')}>
          <Board />
          {isSingleMode && gamePhase === GamePhase.WAITING && (
            <SimpleAlert
              message={alertMessage}
              confirmMessage="Start"
              onConfirm={handleStartClick}
            />
          )}
          {gamePhase === GamePhase.FINISHED && <GameResult />}
        </div>
        <div className={cx('players-container')}>
          <PlayerStatus position={2} />
          <PlayerStatus position={3} />
        </div>
      </div>
      <MyMinos />
    </div>
  )
}
