// src/components/FilmList.tsx
import React from 'react';
import useFilms from '../hooks/useFilms';
import { Film } from '../types/film';

const FilmList: React.FC = () => {
    const { films, loading, error } = useFilms();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading films: {error.message}</p>;

    return (
        <div>
            <h1>Films</h1>
            <ul className="film-list">
                {films.map((film: Film) => (
                    <li key={film.id}>
                        <h2>{film.title} ({film.releaseYear})</h2>
                        <h3>Cast:</h3>
                        <ul>
                            {film.cast.map(actor => (
                                <li key={actor.id}>{actor.firstName} {actor.lastName}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilmList;
