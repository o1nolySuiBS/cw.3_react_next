// src/constant/urls.ts
const baseURL = 'https://api.themoviedb.org/3';

const urls = {
    movies: '/movie/popular',
    movieDetails: (id: number) => `/movie/${id}`,
    search: '/search/movie',
    genres: '/genre/movie/list',
};

export { baseURL, urls };
