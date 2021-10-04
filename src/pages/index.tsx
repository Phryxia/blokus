import { MINOS, rotate } from '../model/minos'
import MinoComponent from '../components/mino'
import { Rotation } from '../model'

export default function Intro() {
  return (
    <>
      {MINOS.map((mino) => (
        <div
          key={mino.name}
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {[0, 90, 180, 270].map((rot) => (
            <div
              key={rot}
              style={{
                marginRight: '10px',
                marginBottom: '10px',
              }}
            >
              <MinoComponent
                mino={rotate(mino, rot as Rotation)}
                cellSize={25}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
