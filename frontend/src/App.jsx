import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from './Component/Navbar'
import Carousel from './Component/Carousel'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div 
    style={{ backgroundColor: "#C8A2E8", minHeight: "100vh" }}>
    <Navbar/>
    <Carousel/>
    </div>
  )
}

export default App
