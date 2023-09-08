import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Picks from './components/pages/Picks'
import NavBar from './components/partials/NavBar'
import Leagues from './components/pages/Leagues'
import LeagueSpecific from './components/pages/LeagueSpecific'
import { useState } from 'react'

function App() {
  return (
    <>
      <NavBar />
      <Router >
        <Routes>currentUser
          <Route 
            path='/' 
            element={<Home />} 
            />
          <Route 
            path='/picks/:week' 
            element={<Picks />} 
            />
          <Route 
            path='/leagues/' 
            element={<Leagues />} 
            />
          <Route 
            path='/league/:leagueId' 
            element={<LeagueSpecific />} 
            />
        </Routes>
      </Router>
    </>
  )
}

export default App
