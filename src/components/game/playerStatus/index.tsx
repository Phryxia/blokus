import classnames from 'classnames/bind'
import styles from '../../../styles/game.module.css'
import { Color, Mino, Player } from '../../../model'
import MinoComponent from '../../mino'

const cx = classnames.bind(styles)

interface PlayerStatusProps {
  player?: Player
  color: Color
  remainMinos: Mino[]
}

export default function PlayerStatus({
  player,
  color,
  remainMinos,
}: PlayerStatusProps) {
  return (
    <div className={classnames(cx('player'), color)}>
      <span className={cx('player-name')}>{player?.name}</span>
      <div className={cx('mino-container')}>
        {remainMinos.map((mino) => (
          <div key={mino.name} className={cx('mino')}>
            <MinoComponent mino={mino} cellSize={15} isBiased color={color} />
          </div>
        ))}
      </div>
    </div>
  )
}
