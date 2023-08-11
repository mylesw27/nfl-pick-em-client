import { Link } from 'react-router-dom';

export default function Home () {
    return (
        <>
        <h1>Home</h1>
        <img src='https://www.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/ARI.svg' alt='Arizona Cardinals' />
        <Link to ='/picks/1'>Week 1</Link>
        <Link to ='/picks/2'>Week 2</Link>
        </>
    )
}