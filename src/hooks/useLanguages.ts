import { useState, useEffect } from 'react';
import { fetchLanguages } from '../services/api';
import { Language } from '../types/language';

const useLanguages = () => {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchLanguages()
            .then((data) => {
                setLanguages(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return { languages, loading, error };
};

export default useLanguages;
