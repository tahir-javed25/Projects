import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toggole } from './Toggle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Toggole/>
    </>
  )
}

export default App
