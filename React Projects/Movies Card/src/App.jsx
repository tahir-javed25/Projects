import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Movies } from '../Components/MoviesData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Movies/>
       
    </>
  )
}

export default App
