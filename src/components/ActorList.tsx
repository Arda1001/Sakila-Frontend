import React from 'react';
import { Link } from 'react-router-dom';
import useActors from '../hooks/useActors';
import { Actor } from '../types/actor';

const ActorList: React.FC = () => {
    const { actors, loading, error } = useActors();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading actors: {error.message}</p>;

    return (
        <div className="container">
            <h1>Actors</h1>
            <ul className="actor-list">
                {actors.map((actor: Actor) => (
                    <li key={actor.id}>
                        <Link to={`/actors/${actor.id}`}>{actor.firstName} {actor.lastName}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActorList;
