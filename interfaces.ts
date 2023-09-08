interface league {
    id: number,
    league_name: string,
    league_admin: number,
}

interface user_id {
    id: number,
    username: string,
    email: string,
}

interface location {
    id: number,
    location_city: string,
    location_state: string,
    location_state_abbr: string,
    stadium_name: string,
}

interface game{
    id: number,
    schedule_away_team: team,
    schedule_home_team: team,
    schedule_location: location,
    schedule_date: string,
    schedule_time: string,
    schedule_week: number,
}

interface team {
    id: number,
    team_location: string,
    team_name: string,
    team_color_1: string,
    team_color_2: string,
}

interface pick {
    id: number,
    game_id: game,
    league_id: league,
    outcome: boolean,
    pick_team_id: team,
    point_stake: number,
    points_awarded: number,
    user_id: user_id,
}

export type { league, user_id, location, game, team, pick };