
import Background from './components/Background'
import Navbar from './components/Navbar'
import './index.css'

function App() {
  

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <Background />
      <Navbar />
      <div className="relative z-10 w-full max-w-2xl px-4 py-8 mt-16">

      </div>
    </div>
  )
}

export default App
