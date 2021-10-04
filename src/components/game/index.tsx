import classnames from 'classnames/bind'
import styles from '../../styles/game.module.css'
import { useEffect } from 'react'
import { Color } from '../../model'
import { useGame } from '../../context/game'
import { useRoom } from '../../context/room'
import HandleInput from './handleInput'
import PlayerStatus from './playerStatus'
import MyMinos from './myMinos'
import Board from './board'

const cx = classnames.bind(styles)

export default function GameRoom() {
  const { gameState, createGame } = useGame()
  const { me } = useRoom()

  console.log(me)

  useEffect(() => {
    if (me) createGame()
  }, [me])

  return (
    <>
      {!me && <HandleInput />}

      <div className={cx('upper-display')}>
        <div className={cx('players-container')}>
          <PlayerStatus
            player={gameState?.players[0]?.player}
            remainMinos={gameState?.players[0]?.remainMinos ?? []}
            color={Color.BLUE}
          />
          <PlayerStatus
            player={gameState?.players[1]?.player}
            remainMinos={gameState?.players[1]?.remainMinos ?? []}
            color={Color.YELLOW}
          />
        </div>
        <div className={cx('board')}>
          <Board />
        </div>
        <div className={cx('players-container')}>
          <PlayerStatus
            player={gameState?.players[2]?.player}
            remainMinos={gameState?.players[2]?.remainMinos ?? []}
            color={Color.RED}
          />
          <PlayerStatus
            player={gameState?.players[3]?.player}
            remainMinos={gameState?.players[3]?.remainMinos ?? []}
            color={Color.GREEN}
          />
        </div>
      </div>
      <MyMinos />
    </>
  )
}
