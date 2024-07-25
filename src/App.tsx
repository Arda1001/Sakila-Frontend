import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ActorList from './components/ActorList';
import ActorDetails from './components/ActorDetails';
import LanguageList from './components/LanguageList';
import Home from './components/Home';
import './App.css';
import FilmList from './components/FilmList';
import FilmDetails from './components/FilmDetails';

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar">
        <ul className="nav-list">
          <li><Link to="/"><button className="nav-button">Home</button></Link></li>
          <li><Link to="/actors"><button className="nav-button">Actors</button></Link></li>
          <li><Link to="/languages"><button className="nav-button">Languages</button></Link></li>
          <li><Link to="/films"><button className="nav-button">Films</button></Link></li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actors" element={<ActorList />} />
          <Route path="/actors/:id" element={<ActorDetails />} />
          <Route path="/languages" element={<LanguageList />} />
          <Route path="/films" element={<FilmList />} />
          <Route path="/films/:id" element={<FilmDetails />} />
          {/* Fallback route for unmatched paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

