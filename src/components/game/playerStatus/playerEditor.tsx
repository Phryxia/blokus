import classnames from 'classnames/bind'
import styles from '@styles/playerEditor.module.css'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useRoom } from '@context/room'
import { Player } from '@model/index'
import { AiDifficulty, AI_PRESET } from '@utils/ai'

const cx = classnames.bind(styles)

interface PlayerCreatorInterface {
  position: number
  player?: Player
}

export default function PlayerEditor({
  position,
  player,
}: PlayerCreatorInterface) {
  const [name, setName] = useState<string>('')
  const [isAi, setIsAi] = useState<boolean>(false)
  const { addPlayer, removePlayer } = useRoom()
  const [aiDifficulty, setAiDifficulty] = useState<AiDifficulty>(
    AiDifficulty.EASY
  )
  const [timeLimit, setTimeLimit] = useState<number>(
    AI_PRESET[aiDifficulty].timeLimit ?? 9999
  )
  const [computationLimit, setComputationLimit] = useState<number | undefined>(
    AI_PRESET[aiDifficulty].computationLimit
  )
  const [defensiveness, setDefensiveness] = useState<number>(
    AI_PRESET[aiDifficulty].defensiveness
  )
  const [aggression, setAggression] = useState<number>(
    AI_PRESET[aiDifficulty].aggression
  )

  useEffect(() => {
    if (aiDifficulty !== AiDifficulty.CUSTOM) {
      const option = AI_PRESET[aiDifficulty]
      setTimeLimit(option.timeLimit ?? 9999)
      setComputationLimit(option.computationLimit ?? 9999)
      setDefensiveness(option.defensiveness)
      setAggression(option.aggression)
    }
  }, [aiDifficulty])

  function handleNameChange(event: SyntheticEvent<HTMLInputElement>): void {
    setName(event.currentTarget.value)
  }

  function handleConfirmClick(): void {
    addPlayer(
      name,
      position,
      isAi ? aiDifficulty : undefined,
      isAi
        ? {
            timeLimit,
            computationLimit,
            defensiveness,
            aggression,
          }
        : undefined
    )
  }

  function handleDeleteClick(): void {
    removePlayer(player)
  }

  function handleAiDifficultyChange(
    event: SyntheticEvent<HTMLSelectElement>
  ): void {
    setAiDifficulty(event.currentTarget.value as AiDifficulty)
  }

  function handleTimeLimitChange(
    event: SyntheticEvent<HTMLInputElement>
  ): void {
    setTimeLimit(parseFloat(event.currentTarget.value))
  }

  function handleComputationLimitChange(
    event: SyntheticEvent<HTMLInputElement>
  ): void {
    setComputationLimit(parseInt(event.currentTarget.value))
  }

  function handleDiffensivenssChange(
    event: SyntheticEvent<HTMLInputElement>
  ): void {
    setDefensiveness(parseFloat(event.currentTarget.value))
  }

  function handleAggression(event: SyntheticEvent<HTMLInputElement>): void {
    setAggression(parseFloat(event.currentTarget.value))
  }

  return (
    <div className={cx('container')}>
      {player ? (
        <button onClick={handleDeleteClick}>DELETE PLAYER</button>
      ) : (
        <>
          <div className={cx('inputs')}>
            <input
              type="text"
              placeholder="player name"
              value={name}
              onChange={handleNameChange}
            />
            AI
            <input
              type="checkbox"
              checked={isAi}
              onChange={() => setIsAi(!isAi)}
            />
          </div>

          {/* AI */}
          {isAi && (
            <div className={cx('ai')}>
              <div className={cx('ai-row')}>
                <label htmlFor={`ai-difficulty-${position}`}>Difficulty</label>
                <select
                  id={`ai-difficulty-${position}`}
                  defaultValue={AiDifficulty.EASY}
                  onChange={handleAiDifficultyChange}
                >
                  {Object.keys(AiDifficulty).map((difficulty) => (
                    <option value={AiDifficulty[difficulty]} key={difficulty}>
                      {AiDifficulty[difficulty]}
                    </option>
                  ))}
                </select>
              </div>

              {
                <>
                  <div className={cx('ai-row')}>
                    <label>Time Limit(sec)</label>
                    <input
                      type="number"
                      min={0}
                      value={timeLimit}
                      onChange={handleTimeLimitChange}
                      disabled={aiDifficulty !== AiDifficulty.CUSTOM}
                    />
                  </div>
                  <div className={cx('ai-row')}>
                    <label style={{ letterSpacing: '-0.1rem' }}>
                      Computation Limit
                    </label>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      value={computationLimit}
                      onChange={handleComputationLimitChange}
                      disabled={aiDifficulty !== AiDifficulty.CUSTOM}
                    />
                  </div>
                  <div className={cx('ai-row')}>
                    <label>Diffensiveness</label>
                    <input
                      type="number"
                      min={0}
                      value={defensiveness}
                      onChange={handleDiffensivenssChange}
                      disabled={aiDifficulty !== AiDifficulty.CUSTOM}
                    />
                  </div>
                  <div className={cx('ai-row')}>
                    <label>Aggression </label>
                    <input
                      type="number"
                      min={0}
                      value={aggression}
                      onChange={handleAggression}
                      disabled={aiDifficulty !== AiDifficulty.CUSTOM}
                    />
                  </div>
                </>
              }
            </div>
          )}
          <button disabled={!name} onClick={handleConfirmClick}>
            ADD PLAYER
          </button>
        </>
      )}
    </div>
  )
}
