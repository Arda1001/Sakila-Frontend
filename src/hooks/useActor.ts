import { useState, useEffect } from 'react';
import { fetchActor } from '../services/api';
import { Actor } from '../types/actor';

const useActor = (id: number) => {
    const [actor, setActor] = useState<Actor | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchActor(id)
            .then((data) => {
                setActor(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    return { actor, loading, error };
};

export default useActor;
