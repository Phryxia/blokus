import classnames from 'classnames/bind'
import styles from '@styles/game.module.css'
import MinoComponent from '@components/mino'
import { Mino, MinoPlacement, MinoTransform, Rotation } from '@model/index'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useGame } from './game'
import { useRoom } from './room'
import { transform } from '@model/minos'

const cx = classnames.bind(styles)

interface SelectedMinoContextInterface {
  selectedMino?: Mino
  currentTransform?: MinoTransform
  setSelectedMino(mino: Mino): void
}

const SelectedMinoContext =
  createContext<SelectedMinoContextInterface>(undefined)

const CELL_SIZE = 30

export function useSelectedMino() {
  return useContext(SelectedMinoContext)
}

export function SelectedMinoProvider({ children }) {
  const { gameState } = useGame()
  const { me } = useRoom()
  const [selectedMino, setSelectedMino] = useState<Mino | undefined>()
  const [isFlippedX, setIsFlippedX] = useState<boolean>(false)
  const [isFlippedY, setIsFlippedY] = useState<boolean>(false)
  const [rotation, setRotation] = useState<Rotation>(0)
  const minoRef = useRef<HTMLDivElement>()

  const myPlayerStatus = gameState?.players.find(
    (player) => player.player === me
  )

  useEffect(() => {
    function handleMouseMove(event) {
      if (!minoRef.current) return

      minoRef.current.style.left = `${event.clientX - CELL_SIZE / 2}px`
      minoRef.current.style.top = `${event.clientY - CELL_SIZE / 2}px`
    }

    if (minoRef.current) {
      document.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  })

  useEffect(() => {
    function handleKeyUp(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setRotation((rotation) => ((rotation + 270) % 360) as Rotation)
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          setRotation((rotation) => ((rotation + 90) % 360) as Rotation)
          break
        case ' ':
          if (!isFlippedX && !isFlippedY) {
            setIsFlippedX(true)
          } else if (isFlippedX && !isFlippedY) {
            setIsFlippedX(false)
            setIsFlippedY(true)
          } else if (!isFlippedX && isFlippedY) {
            setIsFlippedX(true)
            setIsFlippedY(true)
          } else {
            setIsFlippedX(false)
            setIsFlippedY(false)
          }
          break
      }
    }
    document.addEventListener('keyup', handleKeyUp)

    return () => document.removeEventListener('keyup', handleKeyUp)
  }, [isFlippedX, isFlippedY])

  function changeSelectedMino(mino: Mino): void {
    setSelectedMino(mino)
    setIsFlippedX(false)
    setIsFlippedY(false)
    setRotation(0)
  }

  return (
    <SelectedMinoContext.Provider
      value={{
        selectedMino,
        setSelectedMino: changeSelectedMino,
        currentTransform: { isFlippedX, isFlippedY, rotation },
      }}
    >
      {children}
      {myPlayerStatus && selectedMino && (
        <div className={cx('selected-mino')} ref={minoRef}>
          <MinoComponent
            mino={transform(selectedMino, { isFlippedX, isFlippedY, rotation })}
            cellSize={CELL_SIZE}
            color={myPlayerStatus.color}
            isBiased={false}
          />
        </div>
      )}
    </SelectedMinoContext.Provider>
  )
}
