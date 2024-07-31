import React, { useState } from 'react';
import { createLanguage } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateLanguage: React.FC = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            // Convert name to uppercase
            const upperName = name.toUpperCase();

            await createLanguage({ name: upperName });
            alert('Language created successfully!');
            navigate('/languages');
        } catch (err) {
            setError('Failed to create language');
            console.error('Error creating language:', err);
        }
    };

    return (
        <div className="create-language">
            <h1>Create Language</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Language Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Create Language</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default CreateLanguage;
