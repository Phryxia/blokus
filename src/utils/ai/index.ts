import { useGame } from '@context/game'
import { getRandomElements, randomInt } from '../'

const COMPUTATION_LIMIT = 30
const stupidity = 2
const aggression = 1
const defensive = 4

/**
 * This ai is very simple. They are not stateful.
 * They only decide based on current state.
 * Their decision is only valid when it comes to their turn.
 * If the game is not open, they will not do anything.
 * @param difficulty
 * @returns
 */
export function useAi(difficulty: 'stupid' | 'advanced') {
  const { currentPlayerId, fullFeasiblePlacements, place, gameWorld } =
    useGame()

  const myFeasiblePlacements = fullFeasiblePlacements?.[currentPlayerId] ?? []

  if (!gameWorld || myFeasiblePlacements.length === 0) return () => {}

  if (difficulty === 'stupid') {
    return () => {
      setTimeout(() => {
        const maxSize = myFeasiblePlacements.reduce(
          (max, placement) => Math.max(max, placement.mino.shapes.length),
          0
        )
        const filteredPlacements = myFeasiblePlacements.filter(
          (placement) => placement.mino.shapes.length === maxSize
        )
        const selectedPlacement =
          filteredPlacements[randomInt(0, filteredPlacements.length - 1)]
        place(currentPlayerId, selectedPlacement)
      }, 1)
    }
  } else {
    return () => {
      setTimeout(() => {
        const filteredPlacements = getRandomElements(
          myFeasiblePlacements,
          COMPUTATION_LIMIT
        )
        const selectedPlacement = filteredPlacements
          .map((placement, index) => {
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
                defensive * myPossibility -
                aggression * othersPossibility +
                Math.random() * stupidity,
            }
          })
          .sort(
            ({ score: scoreA }, { score: scoreB }) => scoreB - scoreA
          )[0].placement

        place(currentPlayerId, selectedPlacement)
      }, 1)
    }
  }
}
