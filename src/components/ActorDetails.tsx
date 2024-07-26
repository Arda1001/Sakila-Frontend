import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useActor from '../hooks/useActor';


const ActorDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { actor, loading, error } = useActor(Number(id));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading actor: {error.message}</p>;
    if (!actor) return <p>Actor not found</p>;

    return (
        <div className="container">
            <h1>{actor.firstName} {actor.lastName}</h1>
            <h2>Films</h2>
            <ul className="film-list">
                {actor.films.map((film) => (
                    <li key={film.id}>
                        <Link to={`/films/${film.id}`}>
                            {film.title} ({film.releaseYear})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default ActorDetails;