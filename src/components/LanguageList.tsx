import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLanguages from '../hooks/useLanguages';
import { Language } from '../types/language';
import SearchBar from './SearchBar';

const LanguageList: React.FC = () => {
    const { languages, loading, error } = useLanguages();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLanguages = languages.filter(language =>
        language.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading languages: {error.message}</p>;

    return (
        <div>
            <h1>Languages</h1>
            <SearchBar onSearch={setSearchTerm} />
            <Link to="/languages/create">
                <button className="create-button">Create Language</button>
            </Link>
            <ul className="language-list">
                {filteredLanguages.map((language: Language) => (
                    <li key={language.id}>{language.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default LanguageList;
