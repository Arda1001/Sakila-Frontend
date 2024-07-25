import React from 'react';
import { Link } from 'react-router-dom';
import useActors from '../hooks/useActors';

const ActorList: React.FC = () => {
    const { actors, loading, error } = useActors();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading actors: {error.message}</p>;

    return (
        <div>
            <h1>Actors</h1>
            <ul>
                {actors.map((actor) => (
                    <li key={actor.id}>
                        <Link to={`/actors/${actor.id}`}>{actor.firstName} {actor.lastName}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActorList;
