import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import MatchupCard from "../partials/MatchupCard"

export default function Picks() {
    const { week } = useParams()
    const [games, setGames] = useState([])
    const [picks, setPicks] = useState({})
    const [picksForm, setPicksForm] = useState({
        userId: 1,
        league: week,
        picks: [picks],
    })

    useEffect(() => { 
        const getGames = async () => {
            const res = await axios.get(`http://10.0.0.197:8000/api/scheduledata?week=${week}`)
            setGames(res.data)
            const picksRes = await axios.get(`http://10.0.0.197:8000/api/picks`)
            let pickObject: any = {}
            picksRes.data.forEach((pick: {game_id: number, pick_team_id: number}) => {
                pickObject[pick.game_id] = pick.pick_team_id
            })
            setPicks(pickObject)
        }
        getGames()
    }, [])

    const handlePickClick = (gameId: number, teamId: number) => {
        setPicks({...picks, [gameId]: teamId})
        setPicksForm({...picksForm, picks:{...picks, [gameId]: teamId}})
    }
    
    const matchupArray = games.map((game, i) => {
        return (
            <MatchupCard key={`game${i}`} 
                game={game}
                handlePickClick={handlePickClick}
                winner={picks[game.id]}
                />
        )
      })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const res = await axios.post(`http://10.0.0.197:8000/api/createpicks/`, picksForm)
    }

    return (
        <>
        <h1>Picks</h1>
        <h2> Week {week} </h2>
        {matchupArray}
        <form onSubmit={handleSubmit}>
            <input type="number" name="user" value={picksForm.userId} hidden readOnly/>
            <input type="number" name="league" value={picksForm.league} hidden readOnly/>
            <input type="text" name="picks" value={picksForm.picks} hidden readOnly/>
            <input type="submit" value="Submit Picks" />
        </form>
        </>
    )
}
