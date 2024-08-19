import { token } from '@/constant/token';
import { baseURL, urls } from '@/constant/urls';
import { IMovie, IMovieModel } from '@/model/IMovieModel';

const options: RequestInit = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
};

const MovieService = {
    // Отримання списку всіх фільмів із пагінацією
    getAll: async (page: number): Promise<IMovieModel> => {
        try {
            const response = await fetch(`${baseURL}${urls.movies}?page=${page}`, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw new Error('Failed to fetch movies');
        }
    },

    // Отримання фільму за його ID
    getById: async (id: number): Promise<IMovie> => {
        try {
            const response = await fetch(`${baseURL}${urls.movieDetails(id)}`, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching movie details:', error);
            throw new Error('Failed to fetch movie details');
        }
    },

    // Пошук фільмів за текстовим запитом
    searchMovies: async (query: string, page: number): Promise<IMovieModel> => {
        try {
            const response = await fetch(`${baseURL}${urls.search}?query=${query}&page=${page}`, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error searching movies:', error);
            throw new Error('Failed to search movies');
        }
    },

    // Пошук фільмів за жанром
    searchMoviesByGenre: async (genreName: string): Promise<IMovieModel> => {
        try {
            const response = await fetch(`${baseURL}${urls.search}?with_genres=${genreName}`, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error searching movies by genre:', error);
            throw new Error('Failed to search movies by genre');
        }
    }
};

export { MovieService };
