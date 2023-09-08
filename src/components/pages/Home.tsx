import { Link } from 'react-router-dom';

export default function Home () {
    return (
        <>
        <h1>Home</h1>
        <h2>
            <Link to ='/picks/1'>Week 1</Link>
        </h2>
        <h2>
            <Link to ='/picks/2'>Week 2</Link>
        </h2>
        </>
    )
}