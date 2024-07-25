import { Link } from 'react-router-dom';
import useFilms from '../hooks/useFilms';
import React from 'react';
import { Film } from '../types/film';

const FilmList: React.FC = () => {
    const { films, loading, error } = useFilms();

    if (loading) return <div>Loading...</div>;
    if (error) return <p>Error loading films: {error.message}</p>;

    return (
        <div className="container">
            <h1>Films</h1>
            <ul className="film-list">
                {films.map((film: Film) => (
                    <li key={film.id}>
                        <Link to={`/films/${film.id}`}>{film.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilmList;
