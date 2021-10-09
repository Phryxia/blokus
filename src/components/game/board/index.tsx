import { useSelectedMino } from '@context/selectedMino'
import { BOARD_SIZE, Color } from '@model/index'
import { transform } from '@model/minos'
import { CoordinateMap } from '@utils/index'
import classnames from 'classnames/bind'
import { ReactNode } from 'react'
import { useGame } from '../../../context/game'
import styles from '../../../styles/board.module.css'
import Cell, { CellDetail } from './cell'

const cx = classnames.bind(styles)

export default function Board() {
  const {
    gameState,
    cellStates,
    currentPlayerId,
    getFeasiblePlacements,
    place,
    isPlaceable,
    getAnchors,
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
  const decoration = new CoordinateMap<string>()
  feasiblePlacements.forEach(
    ({ mino, position, isFlippedX, isFlippedY, rotation }) => {
      mino = transform(mino, { isFlippedX, isFlippedY, rotation })

      mino.shapes.forEach(({ x, y }) => {
        const nx = x + position.x
        const ny = y + position.y
        decoration.set(nx, ny, 'highlight')
      })
    }
  )
  getAnchors(currentPlayerId).forEach(({ x, y }) => {
    if (decoration.get(x, y) === 'highlight') {
      decoration.set(x, y, 'emphasize')
    }
  })

  function renderCellStates() {
    const result: ReactNode[] = []

    if (!cellStates) return null

    for (let y = 0; y < BOARD_SIZE; ++y) {
      const row: ReactNode[] = []
      for (let x = 0; x < BOARD_SIZE; ++x) {
        const playerId = cellStates.get(x, y).playerId
        const deco = decoration.get(x, y)

        let color: Color | undefined
        let detail: CellDetail | undefined

        if (playerId !== undefined) {
          color = gameState?.players[playerId].color
          detail = CellDetail.RESERVED
        } else if (feasiblePlacements.length > 0 && deco) {
          color = gameState?.players[currentPlayerId].color
          detail = deco === 'highlight' ? CellDetail.PREVIEW : CellDetail.ANCHOR
        } else {
          detail = CellDetail.BLANK
        }

        row.push(
          <Cell
            key={x}
            color={color}
            detail={detail}
            onClick={() => handleCellClick(x, y)}
          />
        )
      }

      result.push(
        <div className={cx('row')} key={y}>
          {row}
        </div>
      )
    }

    return result
  }

  return (
    <div className={classnames(cx('container'), 'window')}>
      <div className={cx('board-wrapper')}>{renderCellStates()}</div>
    </div>
  )
}
