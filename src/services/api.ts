import axios from 'axios';
import { Actor } from '../types/actor';

const api = axios.create({
    baseURL: 'http://localhost:8080', // URL of API
});

export const fetchActors = async (): Promise<Actor[]> => {
    const response = await api.get('/actors');
    return response.data;
};

export const fetchActor = async (id: number): Promise<Actor> => {
    const response = await api.get(`/actors/${id}`);
    return response.data;
};

export const fetchFilms = async () => {
    const response = await api.get('/films');
    return response.data;
};

export const fetchFilm = async (id: number) => {
    const response = await api.get(`/films/${id}`);
    return response.data;
};

export const fetchLanguages = async (): Promise<Language[]> => {
    const response = await api.get('/languages');
    return response.data;
};

export const fetchLanguage = async (id: number): Promise<Language> => {
    const response = await api.get(`/languages/${id}`);
    return response.data;
};

