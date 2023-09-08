import './NavBar.css'

export default function NavBar () {

    return (
        <nav>
            <span className="navbar">
                <h2><a href="/">Home</a></h2>
                <h2><a href="/picks/1">Week 1</a></h2>
                <h2><a href="/picks/2">Week 2</a></h2>
                <h2><a href="/leagues">Leagues</a></h2>
            </span>
        </nav>
    )
}