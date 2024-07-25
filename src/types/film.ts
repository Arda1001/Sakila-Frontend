import { Actor } from "./actor";
import { Language } from './language';

export interface Film {
    id: number;
    title: string;
    description: string;
    releaseYear: number;
    language: Language;
    originalLanguage: Language | null;
    rentalDuration: number;
    rentalRate: number;
    length: number;
    replacementCost: number;
    rating: string;
    specialFeatures: string[];
    cast: Actor[];
}