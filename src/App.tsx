import { useState, useEffect } from 'react'
import './App.css'
import MatchupCard from './components/partials/MatchupCard'
import { data } from './seedData'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Picks from './components/pages/Picks'

function App() {
  const [games, setGames] = useState(data.games)
  
  useEffect(() => {
    const getTeams = async () => {
      const res = await axios.get('http://localhost:8000/scheduledata')
      setGames(res.data)
    }
    getTeams()
  }, [])

  
  const matchupArray = games.map((game, i) => {
    return (
      <MatchupCard key={`game${i}`} game={game} />
    )
  })


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
