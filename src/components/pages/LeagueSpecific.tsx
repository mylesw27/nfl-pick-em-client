import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { league, user_id, location, game, team, pick } from '../../../interfaces.ts'

const api = import.meta.env.VITE_API


export default function LeagueSpecific () {
    const { leagueId } = useParams()
    const [league, setLeague] = useState({id: 0, league_name: '', league_admin: 0})
    const [leagueMembers, setLeagueMembers] = useState([])
    const [week, setWeek] = useState(1)
    const [picks, setPicks] = useState([])
    const [schedule, setSchedule] = useState({})
    const [scheduleArray, setScheduleArray] = useState([])

    useEffect(() => {
        const getLeague = async () => {
            const res = await axios.get(`${api}leagues/${leagueId}`)
            const membersRes = await axios.get(`${api}leaguemembersdata?league=${leagueId}`)
            const picksRes = await axios.get(`${api}picksdata?league=${leagueId}&week=${week}`)
            console.log(`${api}picksdata?league=${leagueId}&week=${week}`)
            let scheduleObject: any = {}
            const scheduleRes = await axios.get(`${api}scheduledata?week=${week}`)
            scheduleRes.data.forEach((game: game) => {
                scheduleObject[game.id] = game
            })
            setLeagueMembers(membersRes.data)
            setLeague(res.data)
            setPicks(picksRes.data)
            setSchedule(scheduleObject)
            setScheduleArray(scheduleRes.data)
        }
        getLeague()
    }, [leagueId, week])

    const scheduleHeaderArray = scheduleArray.map((game: {id: number, schedule_week: number, schedule_home_team: team, schedule_away_team: team}) => {
        return (
            <th key={`game-${game.id}`}>{game.schedule_away_team.team_name} @ {game.schedule_home_team.team_name}</th>
        )
    })

    const leagueMembersArray = leagueMembers.map((member: user_id) => {
        const userPicksArray = picks.filter((pick: {user_id: number, week: number}) => { return pick.user_id.id == member.user_id.id})

        let userPicksObject: any = {}
        userPicksArray.forEach((pick: pick) => {
            userPicksObject[pick.game_id.id] = pick
        })

        const picksScheduleArray = scheduleArray.map((game: pick) => {
            if (userPicksObject[game.id]) {
                return (
                    <td key={`${member.id}-${game.id}`}>{userPicksObject[game.id].pick_team_id.team_name}</td>
                )
            } else {
                return (
                    <td key={`${member.id}-${game.id}`}> - </td>
                )
            }
        })

        return (
            <tr key={`user-row-${member.id}`}>
                <td>{member.user_id.username}</td>
                {picksScheduleArray}
            </tr>
        )
    })

    const handleChangeWeek = async (e: any) => {
        const weekInt = parseInt(e.target.value)
        setWeek(weekInt)
    }

    console.log(picks)

    return (
        <>
            <h1>{league.league_name}</h1>
            <label htmlFor="week">Week</label>
            <select name="week" id="week" defaultValue={1} onChange={(e) => handleChangeWeek(e)}>
                <option value="1">Week 1</option>
                <option value="2">Week 2</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>Members</th>
                        {scheduleArray.length != 0 ? scheduleHeaderArray : <th>No games this week</th>}
                    </tr>
                </thead>
                <tbody>
                    {leagueMembers.length != 0 ? leagueMembersArray : <tr><td>No members yet</td></tr>}
                </tbody>
            </table>
        </>
    )
}
