import { useState, useEffect } from 'react'

export default function Leagues () {
    const [leagues, setLeagues] = useState([])

    useEffect(() => {
        const getLeagues = async () => {
            const res = await fetch('http://10.0.0.197:8000/api/leagues')
            const data = await res.json()
            setLeagues(data)
        }
        getLeagues()
    }, [])

    const leagueArray = leagues.map((league: {id: number, league_name: string}, i: number) => {
        return (
            <h2 key={`league${i}`}><a href={`/league/${league.id}`} >{league.league_name}</a></h2>
        )
    })
    
    return (    
        <>
        <h1>Leagues</h1>
        {leagueArray}
        </>
    )
}