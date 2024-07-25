import { useState, useEffect } from 'react';
import { fetchActors } from '../services/api';
import { Actor } from '../types/actor';

const useActors = () => {
    const [actors, setActors] = useState<Actor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchActors()
            .then((data) => {
                setActors(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return { actors, loading, error };
};

export default useActors;
