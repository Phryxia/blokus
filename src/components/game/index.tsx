import classnames from 'classnames/bind'
import styles from '../../styles/game.module.css'
import { useEffect } from 'react'
import { useGame } from '../../context/game'
import { useRoom } from '../../context/room'
import HandleInput from './handleInput'
import PlayerStatus from './playerStatus'
import MyMinos from './myMinos'
import Board from './board'

const cx = classnames.bind(styles)

export default function GameRoom() {
  const { createGame } = useGame()
  const { me } = useRoom()

  console.log(me)

  useEffect(() => {
    if (me) createGame()
  }, [me])

  return (
    <div className={cx('root')}>
      {!me && <HandleInput />}

      <div className={cx('upper-display')}>
        <div className={cx('players-container')}>
          <PlayerStatus playerId={0} />
          <PlayerStatus playerId={1} />
        </div>
        <div className={cx('board')}>
          <Board />
        </div>
        <div className={cx('players-container')}>
          <PlayerStatus playerId={2} />
          <PlayerStatus playerId={3} />
        </div>
      </div>
      <MyMinos />
    </div>
  )
}
