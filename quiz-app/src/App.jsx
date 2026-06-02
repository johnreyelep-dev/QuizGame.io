import { useState } from 'react'
import LandingPage from "./component/LandingPage.jsx";
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LandingPage />
    </>
  )
}

export default App
