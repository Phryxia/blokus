import { SyntheticEvent, useState } from 'react'
import { useRoom } from '../../../context/room'

export default function HandleInput() {
  const [name, setName] = useState<string>('')
  const { signIn } = useRoom()

  function handleChange(event: SyntheticEvent<HTMLInputElement>): void {
    setName(event.currentTarget.value)
  }

  function handleKeyUp(event: React.KeyboardEvent): void {
    if (event.key === 'Enter') {
      signIn(name)
    }
  }

  function handleConfirmClick(): void {
    signIn(name)
  }

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        value={name}
        onKeyUp={handleKeyUp}
      />
      <button onClick={handleConfirmClick}>OK</button>
    </div>
  )
}
