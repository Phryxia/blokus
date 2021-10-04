import classnames from 'classnames/bind'
import styles from '@styles/game.module.css'
import { useGame } from '@context/game'
import { useRoom } from '@context/room'
import MinoButton from './minoButton'
import { Mino } from '@model/index'
import { useSelectedMino } from '@context/selectedMino'

const cx = classnames.bind(styles)

export default function MyMinos() {
  const { gameState, currentPlayerId } = useGame()
  const { me, isSingleMode } = useRoom()
  const { setSelectedMino } = useSelectedMino()

  const myPlayerStatus = isSingleMode
    ? gameState?.players[currentPlayerId]
    : gameState?.players.find((player) => player.player === me)

  function handleMinoClick(mino: Mino): void {
    setSelectedMino(mino)
  }

  return (
    <div className={classnames(cx('lower-display'), 'window')}>
      <div className={cx('my-minos')}>
        {myPlayerStatus &&
          myPlayerStatus.remainMinos.map((mino) => (
            <MinoButton
              key={mino.name}
              mino={mino}
              onClick={handleMinoClick}
              color={myPlayerStatus.color}
            />
          ))}
      </div>
    </div>
  )
}
