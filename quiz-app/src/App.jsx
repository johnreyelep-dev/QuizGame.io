import { Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import './index.css'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/quiz" element={<QuizPage/>}/>
    </Routes>
  )
}

export default App
