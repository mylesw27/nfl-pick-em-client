import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Picks from './components/pages/Picks'

function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route 
            path='/' 
            element={<Home />} 
            />
          <Route 
            path='/schedule/:week' 
            element={<Picks />} 
            />
        </Routes>
      </Router>
    </>
  )
}

export default App
