import React, { useState, useMemo, useCallback } from 'react';
import _ from 'lodash';
import useActors from '../hooks/useActors';
import { Link } from 'react-router-dom';
import '../App.css';

const ActorList: React.FC = () => {
    const { actors, loading, error } = useActors();
    const [searchTerm, setSearchTerm] = useState('');

    const throttledSetSearchTerm = useCallback(
        _.throttle((value) => setSearchTerm(value), 100),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        throttledSetSearchTerm(e.target.value);
    };

    const filteredActors = useMemo(() => {
        return actors.filter((actor) =>
            `${actor.firstName} ${actor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [actors, searchTerm]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading film: {error.message}</p>;

    return (
        <div className="container">
            <h1>Actors</h1>
            <input
                type="text"
                placeholder="Search actors"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <ul className="actor-list">
                {filteredActors.map((actor) => (
                    <li key={actor.id}>
                        <Link to={`/actors/${actor.id}`}>{actor.firstName} {actor.lastName}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActorList;
