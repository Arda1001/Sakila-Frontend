import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ActorList from './components/ActorList';

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
      </Routes>
    </div>
  );
};

export default App;

