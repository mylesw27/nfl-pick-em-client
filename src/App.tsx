import { useState } from 'react'
import './App.css'
import MatchupCard from './components/partials/MatchupCard'
import { data } from './seedData'

function App() {
  const [games] = useState(data.games)

  const matchupArray = games.map((game, i) => {
    return (
      <MatchupCard key={`game${i}`} game={i} />
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
