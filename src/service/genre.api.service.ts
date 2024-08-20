
import {key, token} from '@/constant/token';
import {baseURL, urls} from '@/constant/urls';
import {IGenre} from '@/model/IGenreModel';
import {IMovieModel} from '@/model/IMovieModel';

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

    getByGenreIdMovies: async (genreId: string, page: number): Promise<IMovieModel> => {
        try {
            const response = await fetch(`${baseURL}${urls.movies}?api_key=${key}&with_genres=${genreId}&page=${page}`, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching movies by genre ID:', error);
            throw new Error('Failed to fetch movies by genre ID');
        }
    },
};

export { GenreService };



