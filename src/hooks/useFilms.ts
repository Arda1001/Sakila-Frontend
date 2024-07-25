// src/hooks/useFilms.ts
import { useState, useEffect } from 'react';
import { fetchFilms } from '../services/api';
import { Film } from '../types/film';

const useFilms = () => {
    const [films, setFilms] = useState<Film[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchFilms()
            .then((data) => {
                setFilms(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return { films, loading, error };
};

export default useFilms;
