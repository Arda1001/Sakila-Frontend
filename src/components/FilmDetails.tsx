import React from 'react';
import { useParams } from 'react-router-dom';
import useFilm from '../hooks/useFilm';

const FilmDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { film, loading, error } = useFilm(Number(id));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading film: {error.message}</p>;
    if (!film) return <p>Film not found</p>;

    return (
        <div className="container">
            <h1>{film.title}</h1>
            <p><strong>Release Year:</strong> {film.releaseYear}</p>
            <p><strong>Description:</strong> {film.description}</p>
            <p><strong>Rental Duration:</strong> {film.rentalDuration} days</p>
            <p><strong>Rental Rate:</strong> ${film.rentalRate}</p>
            <p><strong>Length:</strong> {film.length} minutes</p>
            <p><strong>Replacement Cost:</strong> ${film.replacementCost}</p>
            <p><strong>Rating:</strong> {film.rating}</p>
            <p><strong>Special Features:</strong> {film.specialFeatures.join(', ')}</p>
            <p><strong>Language:</strong> {film.language.name}</p>
            {film.originalLanguage && <p><strong>Original Language:</strong> {film.originalLanguage.name}</p>}
            <h2>Cast</h2>
            <ul>
                {film.cast.map((actor) => (
                    <li key={actor.id}>
                        {actor.firstName} {actor.lastName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilmDetails;
