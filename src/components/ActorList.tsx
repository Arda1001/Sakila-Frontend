import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useActors from '../hooks/useActors';

const ActorList: React.FC = () => {
    const { actors, loading, error } = useActors();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredActors = useMemo(() => {
        return actors.filter((actor) =>
            `${actor.firstName} ${actor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [actors, searchTerm]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading actors: {error.message}</p>;

    return (
        <div>
            <h1>Actors</h1>
            <input
                type="text"
                placeholder="Search actors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <ul className="actor-list">
                {filteredActors.map((actor) => (
                    <li key={actor.id}>
                        <Link to={`/actors/${actor.id}`}>
                            {actor.firstName} {actor.lastName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActorList;

