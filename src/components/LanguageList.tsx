import React from 'react';
import { Link } from 'react-router-dom';
import useLanguages from '../hooks/useLanguages';

const LanguageList: React.FC = () => {
    const { languages, loading, error } = useLanguages();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading languages: {error.message}</p>;

    return (
        <div className="container">
            <h1>Languages</h1>
            <ul className="language-list">
                {languages.map((language) => (
                    <li key={language.id}>
                        <Link to={`/languages/${language.id}`}>{language.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LanguageList;
