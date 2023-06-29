import './MatchupCard.css'

export default function MatchupCard(props: { game: object }) {
    const game = props.game
    const awayTeam = game.schedule_away_team
    const homeTeam = game.schedule_home_team
    const location = game.schedule_location


    return (
        <>
        <div className="matchupCard">
            <h2>{game.schedule_date}</h2>
            <p>{location.location_city}, {location.location_state_abbr}</p>
            <p>{location.stadium_name}</p>
            <div className='teams'>
                <div className="teamCard" style={{backgroundColor: awayTeam.team_color_1, color: awayTeam.team_color_2}}>
                    <p>{awayTeam.team_location}</p>
                    <h3>{awayTeam.team_name}</h3>
                </div>
                <p className='at'>@</p>
                <div className="teamCard" style={{backgroundColor: homeTeam.team_color_1, color: homeTeam.team_color_2}}>
                    <p>{homeTeam.team_location}</p>
                    <h3>{homeTeam.team_name}</h3>
                </div>
            </div> 
        </div>
        </>
    )
}