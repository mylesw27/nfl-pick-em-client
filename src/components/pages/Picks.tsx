import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import MatchupCard from "../partials/MatchupCard"

export default function Picks() {
    const { week } = useParams()
    const [games, setGames] = useState([])

    useEffect(() => { 
        const getGames = async () => {
            const res = await axios.get(`http://localhost:8000/api/scheduledata?week=${week}`)
            setGames(res.data)
        }
        getGames()
    }, [week])
    
    const matchupArray = games.map((game, i) => {
        return (
          <MatchupCard key={`game${i}`} game={game} />
        )
      })


    return (
        <>
        <h1>Picks</h1>
        <h2> Week {week} </h2>
        {matchupArray}
        </>
    )
}