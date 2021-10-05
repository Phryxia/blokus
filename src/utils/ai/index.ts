import { useGame } from '@context/game'
import { randomInt } from '../'

/**
 * This ai is very simple. They are not stateful.
 * They only decide based on current state.
 * Their decision is only valid when it comes to their turn.
 * If the game is not open, they will not do anything.
 * @param difficulty
 * @returns
 */
export function useAi(difficulty: 'stupid' | 'advanced') {
  const { gameState, currentPlayerId, fullFeasiblePlacements, place } =
    useGame()

  const myFeasiblePlacements = fullFeasiblePlacements?.[currentPlayerId] ?? []

  if (!gameState || myFeasiblePlacements.length === 0) return () => {}

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
      }, 500)
    }
  } else {
    return () => {}
  }
}
