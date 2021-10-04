import classnames from 'classnames/bind'
import styles from '../../../styles/game.module.css'
import MinoComponent from '../../mino'
import { useGame } from '@context/game'

const cx = classnames.bind(styles)

interface PlayerStatusProps {
  playerId: number
}

export default function PlayerStatus({ playerId }: PlayerStatusProps) {
  const { gameState } = useGame()

  const playerStatus = gameState?.players[playerId]
  const player = playerStatus?.player

  const color = playerStatus?.color
  const remainMinos = playerStatus?.remainMinos
  const score = remainMinos?.reduce((sum, mino) => sum + mino.shapes.length, 0)

  return (
    <div className={classnames(cx('player'), color, { white: !color })}>
      <span className={cx('player-name')}>{player?.name ?? 'OFFLINE'}</span>
      <span className={cx('player-score')}>
        {player &&
          `${score} cell${score > 1 ? 's' : ''} remain${
            score === 1 ? 's' : ''
          }`}
      </span>
      <div className={cx('mino-container')}>
        {remainMinos?.map((mino) => (
          <div key={mino.name} className={cx('mino')}>
            <MinoComponent mino={mino} cellSize={15} isBiased color={color} />
          </div>
        ))}
      </div>
    </div>
  )
}
