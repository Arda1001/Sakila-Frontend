import React, { useState, useEffect } from 'react';
import { fetchActors, createFilm } from '../services/api';
import { Actor } from '../types/actor';
import { Film } from '../types/film';
import { Language } from '../types/language';

const CreateFilm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [rentalDuration, setRentalDuration] = useState('');
    const [rentalRate, setRentalRate] = useState('');
    const [length, setLength] = useState('');
    const [replacementCost, setReplacementCost] = useState('');
    const [rating, setRating] = useState('');
    const [specialFeatures, setSpecialFeatures] = useState<string[]>([]);
    const [language, setLanguage] = useState<Language>({ id: 0, name: '' });
    const [originalLanguage, setOriginalLanguage] = useState<Language | null>(() => ({ id: 0, name: '' }));
    const [castIds, setCastIds] = useState<number[]>([]);
    const [actors, setActors] = useState<Actor[]>([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchActors().then(setActors);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newFilm: Film = {
            title,
            description,
            releaseYear: parseInt(releaseYear),
            rentalDuration: parseInt(rentalDuration),
            rentalRate: parseFloat(rentalRate),
            length: parseInt(length),
            replacementCost: parseFloat(replacementCost),
            rating,
            specialFeatures,
            language,
            originalLanguage,
            castIds: castIds.map(id => parseInt(String(id))),
            id: 0,
            cast: []
        };

        try {
            await createFilm(newFilm);
            setMessage('Film created successfully!');
        } catch (error) {
            setMessage('Failed to create film.');
        }
    };

    return (
        <div className="container">
            <h1>Create Film</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Release Year:</label>
                    <input type="number" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
                </div>
                <div>
                    <label>Rental Duration:</label>
                    <input type="number" value={rentalDuration} onChange={(e) => setRentalDuration(e.target.value)} />
                </div>
                <div>
                    <label>Rental Rate:</label>
                    <input type="number" value={rentalRate} onChange={(e) => setRentalRate(e.target.value)} />
                </div>
                <div>
                    <label>Length:</label>
                    <input type="number" value={length} onChange={(e) => setLength(e.target.value)} />
                </div>
                <div>
                    <label>Replacement Cost:</label>
                    <input type="number" value={replacementCost} onChange={(e) => setReplacementCost(e.target.value)} />
                </div>
                <div>
                    <label>Rating:</label>
                    <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
                </div>
                <div>
                    <label>Special Features:</label>
                    <input type="text" value={specialFeatures.join(', ')} onChange={(e) => setSpecialFeatures(e.target.value.split(', '))} />
                </div>
                <div>
                    <label>Language ID:</label>
                    <input type="number" value={language.id} onChange={(e) => setLanguage({ ...language, id: parseInt(e.target.value) })} />
                </div>
                <div>
                    <label>Original Language ID:</label>
                    <input type="number" value={originalLanguage?.id || ''} onChange={(e) => setOriginalLanguage({ ...originalLanguage, id: parseInt(e.target.value), name: '' })} />
                </div>
                <div>
                    <label>Cast:</label>
                    <select multiple value={castIds.map(String)} onChange={(e) => setCastIds(Array.from(e.target.selectedOptions, option => parseInt(option.value)))}>
                        {actors.map((actor) => (
                            <option key={actor.id} value={actor.id}>
                                {actor.firstName} {actor.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Create Film</button>
            </form>
        </div>
    );
};

export default CreateFilm;
