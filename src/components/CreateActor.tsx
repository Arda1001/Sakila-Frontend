import React, { useState } from 'react';
import { createActor } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateActor: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            // Convert names to uppercase
            const upperFirstName = firstName.toUpperCase();
            const upperLastName = lastName.toUpperCase();

            await createActor({ firstName: upperFirstName, lastName: upperLastName });
            alert('Actor created successfully!');
            navigate('/actors');
        }
        catch (err) {
            setError('Failed to create actor');
            console.error('Error creating actor:', err);
        }
    };

    return (
        <div className="create-actor">
            <h1>Create Actor</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Create Actor</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default CreateActor;
