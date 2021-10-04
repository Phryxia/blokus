import { useSelectedMino } from '@context/selectedMino'
import { flipX, flipY, rotate } from '@model/minos'
import classnames from 'classnames/bind'
import { useGame } from '../../../context/game'
import styles from '../../../styles/board.module.css'
import Cell from './cell'

const cx = classnames.bind(styles)

export default function Board() {
  const {
    gameState,
    cellStates,
    currentPlayerId,
    getFeasiblePlacements,
    place,
    isPlaceable,
  } = useGame()
  const { selectedMino, setSelectedMino, currentTransform } = useSelectedMino()

  function handleCellClick(x: number, y: number): void {
    if (!selectedMino) return

    const placement = {
      mino: selectedMino,
      position: { x, y },
      ...currentTransform,
    }
    if (isPlaceable(currentPlayerId, placement)) {
      place(currentPlayerId, placement)
      setSelectedMino(undefined)
    }
  }

  const feasiblePlacements = selectedMino
    ? getFeasiblePlacements(currentPlayerId, selectedMino)
    : []
  const highlightMap = new Map<string, boolean>()
  feasiblePlacements.forEach(
    ({ mino, position, isFlippedX, isFlippedY, rotation }) => {
      if (isFlippedX) mino = flipX(mino)
      if (isFlippedY) mino = flipY(mino)
      if (rotation) mino = rotate(mino, rotation)

      mino.shapes.forEach(({ x, y }) => {
        const nx = x + position.x
        const ny = y + position.y
        highlightMap.set(`${nx}-${ny}`, true)
      })
    }
  )

  return (
    <div className={classnames(cx('container'), 'window')}>
      <div className={cx('board-wrapper')}>
        {cellStates.map((row, y) => (
          <div className={cx('row')} key={y}>
            {row.map(({ playerId }, x) => (
              <Cell
                key={x}
                color={gameState?.players[playerId]?.color}
                highlightColor={
                  highlightMap.get(`${x}-${y}`)
                    ? gameState?.players[currentPlayerId]?.color
                    : undefined
                }
                onClick={() => handleCellClick(x, y)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
