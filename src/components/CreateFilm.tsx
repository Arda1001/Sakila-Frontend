import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFilm } from '../services/api';
import useActors from '../hooks/useActors';
import useLanguages from '../hooks/useLanguages';

const CreateFilm: React.FC = () => {
    const navigate = useNavigate();
    const { actors } = useActors();
    const { languages } = useLanguages();

    const specialFeaturesMap: Record<string, string> = {
        "Trailers": "TRAILERS",
        "Commentaries": "COMMENTARIES",
        "Deleted Scenes": "DELETED_SCENES",
        "Behind The Scenes": "BEHIND_THE_SCENES"
    };


    const [filmData, setFilmData] = useState({
        title: '',
        description: '',
        releaseYear: 2024,
        rentalDuration: 1,
        rentalRate: 0,
        length: 1,
        replacementCost: 0,
        rating: 'G',
        specialFeatures: [] as string[],
        languageId: 1,
        originalLanguageId: null as number | null,
        castIds: [] as number[],
    });

    const [selectedActor, setSelectedActor] = useState<number | ''>('');
    const [selectedFeature, setSelectedFeature] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilmData((prevData) => ({
            ...prevData,
            [name]: name === 'languageId' || name === 'originalLanguageId' ? Number(value) : value,
        }));
    };

    const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Only allow non-negative values
        const numericValue = Number(value);
        if (numericValue >= 0) {
            setFilmData((prevData) => ({
                ...prevData,
                [name]: numericValue,
            }));
        }
    };

    const handleAddActor = () => {
        if (selectedActor && !filmData.castIds.includes(selectedActor)) {
            setFilmData((prevData) => ({
                ...prevData,
                castIds: [...prevData.castIds, selectedActor],
            }));
            setSelectedActor(''); // Reset the dropdown after adding
        }
    };

    const handleRemoveActor = (actorId: number) => {
        setFilmData((prevData) => ({
            ...prevData,
            castIds: prevData.castIds.filter((id) => id !== actorId),
        }));
    };

    const handleAddFeature = () => {
        if (selectedFeature && !filmData.specialFeatures.includes(selectedFeature)) {
            setFilmData((prevData) => ({
                ...prevData,
                specialFeatures: [
                    ...prevData.specialFeatures,
                    specialFeaturesMap[selectedFeature] // Convert to backend format
                ]
            }));
            setSelectedFeature(''); // Reset the dropdown after adding
        }
    };

    const handleRemoveFeature = (feature: string) => {
        setFilmData((prevData) => ({
            ...prevData,
            specialFeatures: prevData.specialFeatures.filter((f) => f !== feature),
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Prepare the film data with uppercase transformations
        const uppercasedFilmData = {
            ...filmData,
            title: filmData.title.toUpperCase(),
            description: filmData.description.toUpperCase(),
        };

        createFilm(uppercasedFilmData)
            .then(() => {
                alert('Film created successfully!');
                navigate('/films');
            })
            .catch((error) => {
                console.error('Error creating film:', error);
                alert('Failed to create film');
            });
    };

    return (
        <div className="create-film">
            <h1>Create Film</h1>
            <form id="create-film" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" rows={4} required onChange={handleInputChange}></textarea>
                </div>
                <div>
                    <label htmlFor="releaseYear">Release Year</label>
                    <input
                        type="number"
                        id="releaseYear"
                        name="releaseYear"
                        min="1900"
                        max="2100"
                        required
                        value={filmData.releaseYear}
                        onChange={handleNumberInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="rentalDuration">Rental Duration (days)</label>
                    <input
                        type="number"
                        id="rentalDuration"
                        name="rentalDuration"
                        required
                        value={filmData.rentalDuration}
                        onChange={handleNumberInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="rentalRate">Rental Rate (£)</label>
                    <input
                        type="number"
                        id="rentalRate"
                        name="rentalRate"
                        step="0.01"
                        required
                        value={filmData.rentalRate}
                        onChange={handleNumberInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="length">Length (minutes)</label>
                    <input
                        type="number"
                        id="length"
                        name="length"
                        min={1}
                        required
                        value={filmData.length}
                        onChange={handleNumberInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="replacementCost">Replacement Cost (£)</label>
                    <input
                        type="number"
                        id="replacementCost"
                        name="replacementCost"
                        step="0.01"
                        required
                        value={filmData.replacementCost}
                        onChange={handleNumberInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="rating">Rating</label>
                    <select id="rating" name="rating" required onChange={handleInputChange}>
                        <option value="G">G</option>
                        <option value="PG">PG</option>
                        <option value="PG-13">PG-13</option>
                        <option value="R">R</option>
                        <option value="NC-17">NC-17</option>
                    </select>
                </div>

                {/* Special Features Selection */}
                <div>
                    <label htmlFor="specialFeatures">Special Features</label>
                    <select
                        id="specialFeatures"
                        name="specialFeatures"
                        value={selectedFeature}
                        onChange={(e) => setSelectedFeature(e.target.value)}
                    >
                        <option value="">Select a feature</option>
                        {Object.keys(specialFeaturesMap).map((feature) => (
                            <option key={feature} value={feature}>
                                {feature}
                            </option>
                        ))}
                    </select>
                    <button type="button" className="btn btn-add" onClick={handleAddFeature}>Add Feature</button>
                </div>

                {/* Display selected special features */}
                <div>
                    <h3>Selected Features:</h3>
                    <ul>
                        {filmData.specialFeatures.map((feature, index) => {
                            // Find the user-friendly name by matching the backend format
                            const userFriendlyName = Object.keys(specialFeaturesMap).find(
                                (key) => specialFeaturesMap[key] === feature
                            );

                            return (
                                <li key={index}>
                                    {userFriendlyName} {/* Display user-friendly name */}
                                    <button
                                        type="button"
                                        className="btn btn-remove"
                                        onClick={() => handleRemoveFeature(feature)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Language Selection */}
                <div>
                    <label htmlFor="languageId">Language</label>
                    <select id="languageId" name="languageId" required onChange={handleInputChange}>
                        {languages.map((language) => (
                            <option key={language.id} value={language.id}>
                                {language.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="originalLanguageId">Original Language</label>
                    <select id="originalLanguageId" name="originalLanguageId" onChange={handleInputChange}>
                        <option value="">None</option>
                        {languages.map((language) => (
                            <option key={language.id} value={language.id}>
                                {language.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Actor Selection */}
                <div>
                    <label htmlFor="castIds">Cast</label>
                    <select
                        id="castIds"
                        name="castIds"
                        value={selectedActor}
                        onChange={(e) => setSelectedActor(Number(e.target.value))}
                    >
                        <option value="">Select an actor</option>
                        {actors.map((actor) => (
                            <option key={actor.id} value={actor.id}>
                                {actor.firstName} {actor.lastName}
                            </option>
                        ))}
                    </select>
                    <button type="button" className="btn btn-add" onClick={handleAddActor}>Add Actor</button>
                </div>

                {/* Display selected actors */}
                <div>
                    <h3>Selected Cast:</h3>
                    <ul>
                        {filmData.castIds.map((actorId, index) => {
                            const actor = actors.find((a) => a.id === actorId);
                            return (
                                <li key={index}>
                                    {actor?.firstName} {actor?.lastName}
                                    <button type="button" className="btn btn-remove" onClick={() => handleRemoveActor(actorId)}>Remove</button>
                                </li>
                            );
                        })}
                    </ul>
                </div>


                <button type="submit" className="create-button">Create Film</button>
            </form>
        </div>
    );
};

export default CreateFilm;
