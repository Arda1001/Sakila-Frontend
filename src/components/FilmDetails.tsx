import React from 'react';
import { useParams } from 'react-router-dom';
import useFilm from '../hooks/useFilm';


const formatSpecialFeature = (feature: string) => {
    return feature
        .toLowerCase()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const formatRating = (rating: string) => {
    return rating.replace('_', '-');

};


const FilmDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { film, loading, error } = useFilm(Number(id));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading film: {error.message}</p>;
    if (!film) return <p>Film not found</p>;

    return (
        <div className="container film-details">
            <h1>{film.title}</h1>
            <p>{film.description}</p>
            <p>Release Year: {film.releaseYear}</p>
            <p>Rental Duration: {film.rentalDuration} days</p>
            <p>Rental Rate: ${film.rentalRate}</p>
            <p>Length: {film.length} minutes</p>
            <p>Replacement Cost: ${film.replacementCost}</p>
            <p>Rating: {formatRating(film.rating)}</p>
            <p>Special Features: {film.specialFeatures.map(formatSpecialFeature).join(', ')}</p>
            <p>Language: {film.language.id ? film.language.name : 'N/A'}</p>
            <p>Original Language: {film.originalLanguage ? film.originalLanguage.name : 'N/A'}</p>
            <h2>Cast</h2>
            <ul className="actor-list">
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
