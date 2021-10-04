import classnames from 'classnames/bind'
import styles from '@styles/game.module.css'
import { useMemo } from 'react'
import { useGame } from '@context/game'

const cx = classnames.bind(styles)

interface GameResultProps {}

export default function GameResult({}: GameResultProps) {
  const { gameState, resetGame } = useGame()

  if (!gameState) return

  const result = useMemo(
    () =>
      gameState.players
        .map((ps) => ({
          playerStatus: ps,
          score: ps.remainMinos.reduce(
            (sum, mino) => mino.shapes.length + sum,
            0
          ),
          rank: 1,
        }))
        .sort(({ score: scoreA }, { score: scoreB }) => scoreA - scoreB),
    [gameState]
  )

  for (let i = 1; i < result.length; ++i) {
    if (result[i].score === result[i - 1].score) {
      result[i].rank = result[i - 1].rank
    } else {
      result[i].rank = i + 1
    }
  }

  return (
    <div
      className={classnames(cx('player-result-container'), 'window', 'white')}
    >
      <span className={cx('title')}>Result</span>
      <span className={cx('time')}>
        Elapsed Time: {elapsedTime(gameState.endTime, gameState.startTime)}
      </span>
      {result.map(({ playerStatus, score, rank }) => (
        <div
          className={classnames(cx('record'), playerStatus.color)}
          key={playerStatus.playerId}
        >
          <span>{rank}.</span>
          <span>{playerStatus.player.name}</span>
          <span>{score}</span>
        </div>
      ))}
      <button onClick={resetGame}>New Game</button>
    </div>
  )
}

function elapsedTime(date1: Date, date2: Date): string {
  const diffSec = Math.floor((date1.getTime() - date2.getTime()) / 1000)

  const sec = diffSec % 60
  const min = Math.floor((diffSec % 3600) / 60)
  const hour = Math.floor(diffSec / 3600)

  return [hour > 0 ? `${hour}h` : '', min > 0 ? `${min}m` : '', `${sec}s`].join(
    ' '
  )
}
