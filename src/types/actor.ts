export interface Film {
    id: number;
    title: string;
    releaseYear: number;
}

export interface Actor {
    id: number;
    firstName: string;
    lastName: string;
    films: Film[];
}