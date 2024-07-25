import React from 'react';
import useLanguages from '../hooks/useLanguages';
import { Language } from '../types/language';

const LanguageList: React.FC = () => {
    const { languages, loading, error } = useLanguages();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading languages: {error.message}</p>;

    return (
        <div>
            <h1>Languages</h1>
            <ul className="language-list">
                {languages.map((language: Language) => (
                    <li key={language.id}>{language.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default LanguageList;
