import classnames from 'classnames/bind'
import styles from '@styles/game.module.css'
import { useGame } from '@context/game'
import { useRoom } from '@context/room'
import MinoButton from './minoButton'
import { Mino } from '@model/index'
import { useSelectedMino } from '@context/selectedMino'

const cx = classnames.bind(styles)

export default function MyMinos() {
  const { gameState } = useGame()
  const { me } = useRoom()
  const { setSelectedMino } = useSelectedMino()

  const myPlayerStatus = gameState?.players.find(
    (player) => player.player === me
  )

  function handleMinoClick(mino: Mino): void {
    setSelectedMino(mino)
  }

  return (
    <div className={cx('lower-display')}>
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
