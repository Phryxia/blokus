import classnames from 'classnames/bind'
import styles from '@styles/game.module.css'
import MinoComponent from '../../mino'
import { GamePhase, useGame } from '@context/game'
import { useRoom } from '@context/room'
import PlayerEditor from './playerEditor'

const cx = classnames.bind(styles)

interface PlayerStatusProps {
  position: number
}

export default function PlayerStatus({ position }: PlayerStatusProps) {
  const { gameState, gamePhase } = useGame()
  const { players, isSingleMode } = useRoom()

  const player = players.find((player) => player.position === position)
  const playerStatus = gameState?.players.find(
    (playerStatus) => playerStatus.player === player
  )

  const color = playerStatus?.color
  const remainMinos = playerStatus?.remainMinos
  const score = remainMinos?.reduce((sum, mino) => sum + mino.shapes.length, 0)

  return (
    <div className={classnames(cx('player'), color, { white: !color })}>
      <span className={cx('player-name')}>
        {player ? `${player?.name}${player?.isAi ? ' (AI)' : ''}` : 'OFFLINE'}
      </span>
      <span className={cx('player-score')}>
        {playerStatus &&
          `${score} cell${score > 1 ? 's' : ''} remain${
            score === 1 ? 's' : ''
          }`}
      </span>
      {isSingleMode && gamePhase === GamePhase.WAITING ? (
        <PlayerEditor position={position} player={player} />
      ) : (
        <div className={cx('mino-container')}>
          {remainMinos?.map((mino) => (
            <div key={mino.name} className={cx('mino')}>
              <MinoComponent mino={mino} cellSize={15} isBiased color={color} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
