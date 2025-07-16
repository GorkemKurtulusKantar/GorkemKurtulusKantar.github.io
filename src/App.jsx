import { useState } from 'react'

import './index.css'
import Background from './components/Background'

function App() {
  const [count, setCount] = useState(0)

  return (
  
    <div  className="relative min-h-screen flex flex-col items-center justify-center">
    <Background />
    <div className="relative z-10 w-full max-w-2xl px-4 py-8">
    <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
          Portfolyo
        </h1>
        {/* Türkçe açıklama: Responsive açıklama */}
        <p className="text-lg md:text-xl text-gray-200 text-center">
          Merhaba! Benim portfolyo siteme hoş geldiniz.
        </p>
      </div>
    
    </div >
  
  )
}

export default App
