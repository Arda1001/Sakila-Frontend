import { useState, useEffect } from 'react';
import { fetchFilm } from '../services/api';
import { Film } from '../types/film';

const useFilm = (id: number) => {
    const [film, setFilm] = useState<Film | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchFilm(id)
            .then((data) => {
                setFilm(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    return { film, loading, error };
};

export default useFilm;
