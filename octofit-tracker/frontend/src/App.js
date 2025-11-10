import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src={`${process.env.PUBLIC_URL}/octofitapp-small.svg`} alt="OctoFit" className="octo-logo me-2" />
              <span className="navbar-title">OctoFit Tracker</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="hero py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-3 text-center text-md-start">
                <img src={`${process.env.PUBLIC_URL}/octofitapp-small.svg`} alt="OctoFit" className="octo-logo-lg mb-3 mb-md-0" />
              </div>
              <div className="col-md-9">
                <h1 className="hero-title">OctoFit Tracker</h1>
                <p className="lead hero-subtitle">Track activities, join teams, and compete on leaderboards — all in one place.</p>
                <div>
                  <Link to="/activities" className="btn btn-primary hero-cta me-2">View Activities</Link>
                  <Link to="/leaderboard" className="btn btn-outline-light">Leaderboard</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<Activities />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
