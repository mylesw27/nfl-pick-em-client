import { useState, useEffect } from 'react'
import './App.css'
import MatchupCard from './components/partials/MatchupCard'
import { data } from './seedData'
import axios from 'axios'

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
      <h1>NFL Pick 'Em</h1>
      {matchupArray}
    </>
  )
}

export default App
