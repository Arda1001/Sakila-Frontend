import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ActorList from './components/ActorList';
import ActorDetails from './components/ActorDetails';
import LanguageList from './components/LanguageList';
import Home from './components/Home';
import FilmList from './components/FilmList';
import FilmDetails from './components/FilmDetails';
import ErrorPage from './components/errorPage';

const App: React.FC = () => {
  return (
    <body>
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
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </body>
  );
};

export default App;

