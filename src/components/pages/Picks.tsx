import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import MatchupCard from "../partials/MatchupCard"
import { pick, game } from '../../../interfaces.ts'

export default function Picks() {
    const { week } = useParams()
    const [games, setGames] = useState([])
    const [picks, setPicks] = useState({})
    const [currentUser, setCurrentUser] = useState(3)
    const [picksForm, setPicksForm] = useState({
        userId: currentUser,
        league: week,
        picks: [picks],
    })

    useEffect(() => { 
        const getGames = async () => {
            const res = await axios.get(`http://10.0.0.197:8000/api/scheduledata?week=${week}`)
            setGames(res.data)
            let pickObject: any = {}
            const picksRes = await axios.get(`http://10.0.0.197:8000/api/picksdata?user=${currentUser}&week=${week}`)
            picksRes.data.forEach((pick: pick) => {
                pickObject[pick.game_id.id] = pick.pick_team_id.id
            })
            setPicks(pickObject)
        }
        getGames()
        setPicksForm({...picksForm, picks: picks})
    }, [currentUser])

    const handlePickClick = (gameId: number, teamId: number) => {
        setPicks({...picks, [gameId]: teamId})
        setPicksForm({...picksForm, picks:{...picks, [gameId]: teamId}})
    }
    
    const matchupArray = games.map((game: game, i) => {
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

    const handleCurrentUser = (user: string) => {
        const userInt = parseInt(user)
        setCurrentUser(userInt)
        setPicksForm({...picksForm, userId: userInt})
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
            <label htmlFor="user">Select User:</label>
            <select name="user" value={currentUser} onChange={(e) => handleCurrentUser(e.target.value)} >
                <option value="1">1 - Myles</option>
                <option value="2">2 - Blake</option>
                <option value="3">3 - Zac</option>
            </select>
            <div> -</div>
            <input type="submit" value={`Submit Picks for user Id ${currentUser}`} />
        </form>
        </>
    )
}
