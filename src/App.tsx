import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ActorList from './components/ActorList';
import ActorDetails from './components/ActorDetails';
import LanguageList from './components/LanguageList';
import Home from './components/Home';
import FilmList from './components/FilmList';
import FilmDetails from './components/FilmDetails';
import ErrorPage from './components/errorPage';
import CreateActor from './components/CreateActor';
import CreateLanguage from './components/CreateLanguage';
import Navbar from './components/Navbar';
import CreateFilm from './components/CreateFilm';

const App: React.FC = () => {
  return (
    <body>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actors" element={<ActorList />} />
          <Route path="/actors/:id" element={<ActorDetails />} />
          <Route path="/languages" element={<LanguageList />} />
          <Route path="/films" element={<FilmList />} />
          <Route path="/films/:id" element={<FilmDetails />} />
          <Route path="/actors/create" element={<CreateActor />} />
          <Route path="/create-language" element={<CreateLanguage />} />
          <Route path="/create-film" element={<CreateFilm />} />
          {/* Fallback route for unmatched paths */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </body>
  );
};

export default App;

