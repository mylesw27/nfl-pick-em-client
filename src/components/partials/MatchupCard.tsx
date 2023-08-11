import './MatchupCard.css'
import { SetStateAction, useEffect, useState, useRef } from 'react'

export default function MatchupCard(props: { 
    game: {
        id: number,
        schedule_date: string,
        schedule_week: number,
        schedule_away_team: {
            id: number,
            team_location: string,
            team_name: string,
            team_color_1: string,
            team_color_2: string,
        }
        schedule_home_team: {
            id: number,
            team_location: string,
            team_name: string,
            team_color_1: string,
            team_color_2: string,
        },  
        schedule_location: 
        {
            location_city: string, 
            location_state_abbr: string, 
            stadium_name: string,
        }}, 
    handlePickClick: Function
    winner: number}) {
    const game = props.game
    const handlePickClick = props.handlePickClick
    const awayTeam = game.schedule_away_team
    const homeTeam = game.schedule_home_team
    const location = game.schedule_location

    const awayRef = useRef(null)
    const homeRef = useRef(null)

    function determineWinner() {
        if (props.winner === awayTeam.id) {
            awayRef.current.style.boxShadow=`0px 0px 10px 2px ${awayTeam.team_color_2}`
            homeRef.current.style.boxShadow="none"
        } else if (props.winner === homeTeam.id) {
            homeRef.current.style.boxShadow=`0px 0px 10px 2px ${homeTeam.team_color_2}`
            awayRef.current.style.boxShadow="none" 
        }
    }

    useEffect(() => {
        determineWinner()
    }, [props.winner])

    return (
        <>
        <div className="matchupCard">
            <h2>{game.schedule_date}</h2>
            <p>{location.location_city}, {location.location_state_abbr}</p>
            <p>{location.stadium_name}</p>
            <div className='teams'>
                <button className="teamCard" id="teamCard" style={{backgroundColor: awayTeam.team_color_1, color: awayTeam.team_color_2, backgroundImage: `url(${awayTeam.team_logo})`}} onClick={()=>{handlePickClick(game.id, awayTeam.id)}}
                ref={awayRef}>
                    {/* <img src={awayTeam.team_logo} alt={`${awayTeam.team_location} ${awayTeam.team_name} logo`} className='teamLogo'/> */}
                    <p>{awayTeam.team_location}</p>
                    <h3>{awayTeam.team_name}</h3>
                </button>
                <p className='at'>@</p>
                <button className="teamCard" style={{backgroundColor: homeTeam.team_color_1, color: homeTeam.team_color_2}} onClick={()=>{handlePickClick(game.id, homeTeam.id)}} 
                ref={homeRef}>
                    <p>{homeTeam.team_location}</p>
                    <h3>{homeTeam.team_name}</h3>
                </button>
            </div> 
        </div>
        </>
    )
}