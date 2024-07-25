import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ActorList from './components/ActorList';
import ActorDetails from './components/ActorDetails';

const App: React.FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/actors">Actors</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/actors" element={<ActorList />} />
        <Route path="/actors/:id" element={<ActorDetails />} />
      </Routes>
    </div>
  );
};

export default App;

