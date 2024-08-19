// src/service/genre.api.service.ts
import { key, token } from '@/constant/token';
import { baseURL, urls } from '@/constant/urls';
import { IGenre } from '@/model/IGenreModel';

const options: RequestInit = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
};

const GenreService = {
    getGenres: async (): Promise<IGenre[]> => {
        try {
            const response = await fetch(`${baseURL}${urls.genres}?api_key=${key}`, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.genres as IGenre[];
        } catch (error) {
            console.error('Error fetching genres:', error);
            throw new Error('Failed to fetch genres');
        }
    },
};

export { GenreService };
