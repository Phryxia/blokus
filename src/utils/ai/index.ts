import { useGame } from '@context/game'
import { getRandomElements, shuffle } from '../'

export enum AiDifficulty {
  STUPID = 'stupid',
  EASY = 'easy',
  HARD = 'hard',
  GURU = 'guru', // danger: very slow
  CUSTOM = 'custom',
}

export interface AiOption {
  timeLimit: number // in second
  computationLimit?: number
  aggression: number // usually 0 ~ 1
  defensiveness: number // usually 0 ~ 1
}

export const AI_PRESET: Record<AiDifficulty, AiOption> = {
  [AiDifficulty.STUPID]: {
    timeLimit: 1,
    computationLimit: 1,
    aggression: 0.5,
    defensiveness: 0.5,
  },
  [AiDifficulty.EASY]: {
    timeLimit: 5,
    computationLimit: 10,
    aggression: 0.3,
    defensiveness: 0.7,
  },
  [AiDifficulty.HARD]: {
    timeLimit: 10,
    computationLimit: 40,
    aggression: 0.7,
    defensiveness: 0.6,
  },
  [AiDifficulty.GURU]: {
    timeLimit: 30,
    aggression: 0.5,
    defensiveness: 0.5,
  },
  [AiDifficulty.CUSTOM]: {
    // These values are not used
    timeLimit: 0,
    aggression: 0,
    defensiveness: 0,
  },
}

/**
 * This ai is very simple. They are not stateful.
 * They only decide based on current state.
 * Their decision is only valid when it comes to their turn.
 * If the game is not open, they will not do anything.
 * @param difficulty
 * @returns
 */
export function useAi(difficulty?: AiDifficulty, customOption?: AiOption) {
  const option =
    difficulty === AiDifficulty.CUSTOM
      ? customOption
      : AI_PRESET[difficulty] ?? AI_PRESET[AiDifficulty.STUPID]
  const { currentPlayerId, fullFeasiblePlacements, place, gameWorld } =
    useGame()

  const myFeasiblePlacements = fullFeasiblePlacements?.[currentPlayerId] ?? []

  if (!gameWorld || myFeasiblePlacements.length === 0) return () => {}

  return () => {
    setTimeout(() => {
      const filteredPlacements = option.computationLimit
        ? getRandomElements(myFeasiblePlacements, option.computationLimit)
        : shuffle(myFeasiblePlacements)
      const startTime = new Date()

      const selectedPlacement = filteredPlacements
        .map((placement, index) => {
          if (
            option.timeLimit &&
            option.timeLimit <
              (new Date().getTime() - startTime.getTime()) / 1000
          ) {
            console.log('TL')
            return {
              placement,
              score: -99999,
            }
          }

          console.log(`${index + 1}/${filteredPlacements.length}`)

          let myPossibility = 0
          let othersPossibility = 0
          const newWorld = gameWorld.fork()

          newWorld.place(currentPlayerId, placement)
          newWorld
            .getFullFeasiblePlacements()
            .forEach((nextPlacements, playerId) => {
              if (playerId === currentPlayerId) {
                myPossibility += nextPlacements.length
              } else {
                othersPossibility += nextPlacements.length
              }
            })

          return {
            placement,
            score:
              option.defensiveness * myPossibility -
              (option.aggression * othersPossibility) /
                (gameWorld.getGameState().players.length - 1),
          }
        })
        .sort(
          ({ score: scoreA }, { score: scoreB }) => scoreB - scoreA
        )[0].placement

      place(currentPlayerId, selectedPlacement)
    }, 1)
  }
}
