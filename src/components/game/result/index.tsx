import classnames from 'classnames/bind'
import styles from '@styles/game.module.css'
import { useMemo } from 'react'
import { useGame } from '@context/game'
import { PlayerGameState } from '@model/index'

const cx = classnames.bind(styles)

interface GameResultProps {}

export default function GameResult({}: GameResultProps) {
  const { gameState, resetGame } = useGame()

  if (!gameState) return

  const result = useMemo(() => {
    const out = gameState.players
      .map((ps) => ({
        playerStatus: ps,
        score: computeScore(ps),
        rank: 1,
      }))
      .sort(
        ({ score: scoreA }, { score: scoreB }) =>
          scoreB.totalScore - scoreA.totalScore
      )

    for (let i = 1; i < out.length; ++i) {
      if (out[i].score.totalScore === out[i - 1].score.totalScore) {
        out[i].rank = out[i - 1].rank
      } else {
        out[i].rank = i + 1
      }
    }

    return out
  }, [gameState])

  return (
    <div
      className={classnames(cx('player-result-container'), 'window', 'white')}
    >
      <span className={cx('title')}>Result</span>
      <span className={cx('time')}>
        Elapsed Time: {elapsedTime(gameState.endTime, gameState.startTime)}
      </span>
      <div className={cx('record', 'header')}>
        <span></span>
        <span>
          Player
          <br />
          Name
        </span>
        <span>
          Block
          <br />
          Penalty
        </span>
        <span>
          Clear
          <br />
          Bonus
          <span className={cx('tooltip')}>
            Receive +15 when you placed your every blocks
          </span>
        </span>
        <span>
          Last 1x1
          <br />
          Bonus
          <span className={cx('tooltip')}>
            Receive +5 when you placed your every blocks and the last one was
            1x1
          </span>
        </span>
        <span>
          Total
          <br />
          Score
        </span>
      </div>
      {result.map(({ playerStatus, score, rank }) => (
        <div
          className={classnames(cx('record'), playerStatus.color)}
          key={playerStatus.playerId}
        >
          <span>{rank}.</span>
          <span>{playerStatus.player.name}</span>
          <span>{score.blockScore}</span>
          <span>{score.clearScore ? '+15' : ''}</span>
          <span>{score.last1x1Score ? '+5' : ''}</span>
          <span>{score.totalScore}</span>
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

function computeScore(playerStatus: PlayerGameState): {
  blockScore: number
  clearScore: number
  last1x1Score: number
  totalScore: number
} {
  const blockScore = -playerStatus.remainMinos.reduce(
    (sum, mino) => mino.shapes.length + sum,
    0
  )
  const clearScore = playerStatus.remainMinos.length === 0 ? 15 : 0
  const last1x1Score = playerStatus.is1x1PlacedLast ? 5 : 0
  return {
    blockScore,
    clearScore,
    last1x1Score,
    totalScore: blockScore + clearScore + last1x1Score,
  }
}
