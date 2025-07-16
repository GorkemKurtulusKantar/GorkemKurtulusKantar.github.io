import { useState } from 'react'

import './index.css'
import Background from './components/Background'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='relative'>
    <Background />

    </div>
      <div className="relative z-10">
        <h1 className="text-4xl font-bold">Gorkem Kantar</h1>
      
      
      </div>
    </>
  )
}

export default App
