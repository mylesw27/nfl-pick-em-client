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
            path='/picks/:week' 
            element={<Picks />} 
            />
          {/* <Route 
            path='/leagues/' 
            element={<Leagues />} 
            />
          <Route 
            path='/leagues/:leagueId' 
            element={<LeagueSpecific />} 
            /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
