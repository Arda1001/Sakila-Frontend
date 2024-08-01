import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useFilms from '../hooks/useFilms';
import { Film } from '../types/film';
import SearchBar from './SearchBar';

const FilmList: React.FC = () => {
    const { films, loading, error } = useFilms();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFilms = useMemo(() => {
        return films.filter((film) =>
            `${film.title}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [films, searchTerm]);

    if (loading) return <div>Loading...</div>;
    if (error) return <p>Error loading films: {error.message}</p>;

    return (
        <div className="container">
            <h1>Films</h1>
            <SearchBar onSearch={setSearchTerm} />
            <Link to="/films/create">
                <button className="create-button">Create Film</button>
            </Link>
            <ul className="film-list">
                {filteredFilms.map((film: Film) => (
                    <li key={film.id}>
                        <Link to={`/films/${film.id}`}>{film.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilmList;
