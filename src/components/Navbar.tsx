import React from 'react';
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li><Link to="/"><button className="nav-button">Home</button></Link></li>
                <li><Link to="/actors"><button className="nav-button">Actors</button></Link></li>
                <li><Link to="/languages"><button className="nav-button">Languages</button></Link></li>
                <li><Link to="/films"><button className="nav-button">Films</button></Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;