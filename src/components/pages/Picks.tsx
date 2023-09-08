import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import MatchupCard from "../partials/MatchupCard"
import { pick, game } from '../../../interfaces.ts'

export default function Picks() {
    const { week } = useParams()
    const [games, setGames] = useState([])
    const [league, setLeague] = useState(1)
    const [picks, setPicks] = useState({})
    const [currentUser, setCurrentUser] = useState(1)
    const [picksForm, setPicksForm] = useState({
        userId: currentUser,
        league: league,
        picks: [picks],
    })

    useEffect(() => { 
        const getGames = async () => {
            const res = await axios.get(`http://10.0.0.197:8000/api/scheduledata?week=${week}`)
            setGames(res.data)
            let pickObject: any = {}
            const picksRes = await axios.get(`http://10.0.0.197:8000/api/picksdata?user=${currentUser}&week=${week}&league=${league}`)
            picksRes.data.forEach((pick: pick) => {
                pickObject[pick.game_id.id] = pick.pick_team_id.id
            })
            setPicks(pickObject)
        }
        getGames()
        setPicksForm({...picksForm, picks: picks})
    }, [currentUser, league])

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

    const handleChangeLeague = (e: any) => {
        const leagueInt = parseInt(e.target.value)
        setLeague(leagueInt)
        setPicksForm({...picksForm, league: leagueInt})
    }

    return (
        <>
        <h1>Picks</h1>
        <h2> Week {week} </h2>

        <select name="user" value={currentUser} onChange={(e) => handleCurrentUser(e.target.value)} >
            <option value="1">1 - Myles</option>
            <option value="2">2 - Blake</option>
            <option value="3">3 - Zac</option>
        </select>
        <select name="league" value={league} onChange={(e) => handleChangeLeague(e)} >
            <option value="1">1 - Test League</option>
            <option value="2">2 - Second League</option>
        </select>
        {matchupArray}
        <form onSubmit={handleSubmit}>
            <input type="number" name="user" value={picksForm.userId} hidden readOnly/>
            <input type="number" name="league" value={picksForm.league} hidden readOnly/>
            <input type="text" name="picks" value={picksForm.picks} hidden readOnly/>
            <label htmlFor="user">Select User:</label>
         
            <div> -</div>
            <input type="submit" value={`Submit Picks for user Id ${currentUser}`} />
        </form>
        </>
    )
}
