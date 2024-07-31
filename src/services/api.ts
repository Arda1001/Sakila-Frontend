import axios from 'axios';
import { Actor } from '../types/actor';
import { Language } from '../types/language';
import { Film } from '../types/film';

const BASE_URL = (import.meta.env.VITE_API_URL ?? "") + "/api"

const api = axios.create({
    baseURL: BASE_URL, // URL of API
});

export const fetchActors = async (): Promise<Actor[]> => {
    const response = await api.get('/actors');
    return response.data;
};

export const fetchActor = async (id: number): Promise<Actor> => {
    const response = await api.get(`/actors/${id}`);
    return response.data;
};

export const fetchFilms = async (): Promise<Film[]> => {
    const response = await api.get('/films');
    return response.data;
};

export const fetchFilm = async (id: number): Promise<Film> => {
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

