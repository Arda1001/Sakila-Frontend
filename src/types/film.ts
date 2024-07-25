import { Actor } from "./actor";

export interface Film {
    id: number;
    title: string;
    description: string;
    releaseYear: number;
    languageId: number;
    originalLanguageId: number | null;
    rentalDuration: number;
    rentalRate: number;
    length: number;
    replacementCost: number;
    rating: string;
    specialFeatures: string[];
    cast: Actor[];
}