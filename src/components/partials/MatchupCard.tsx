import { data } from '../../seedData'
import './MatchupCard.css'

export default function MatchupCard(props: { game: number }) {
    const matchup = data.games[props.game]

    return (
        <>
        <div className="matchupCard">
            <h2>Matchup {props.game + 1}</h2>
            <div className="teamCard" style={{backgroundColor: matchup.awayTeam.color1, color: matchup.awayTeam.color2}}>
                <p>{matchup.awayTeam.teamLocation}</p>
                <h3>{matchup.awayTeam.teamName}</h3>
            </div>
            <p className='at'>@</p>
            <div className="teamCard" style={{backgroundColor: matchup.homeTeam.color1, color: matchup.homeTeam.color2}}>
                <p>{matchup.homeTeam.teamLocation}</p>
                <h3>{matchup.homeTeam.teamName}</h3>
            </div>
            
        </div>
        </>
    )
}