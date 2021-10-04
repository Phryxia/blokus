import classnames from 'classnames/bind'
import styles from '../../styles/game.module.css'
import { useRoom } from '../../context/room'
import HandleInput from './handleInput'
import PlayerStatus from './playerStatus'
import MyMinos from './myMinos'
import Board from './board'

const cx = classnames.bind(styles)

export default function GameRoom() {
  const { me, isSingleMode } = useRoom()

  return (
    <div className={cx('root')}>
      {!isSingleMode && !me && <HandleInput />}

      <div className={cx('upper-display')}>
        <div className={cx('players-container')}>
          <PlayerStatus position={0} />
          <PlayerStatus position={1} />
        </div>
        <div className={cx('board')}>
          <Board />
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
