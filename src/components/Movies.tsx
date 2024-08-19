'use client';
import React, { useEffect, useState } from 'react';
import { MovieService } from '@/service/movie.api.service';
import { IMovieModel } from '@/model/IMovieModel';

const Movies: React.FC = () => {
    const [movies, setMovies] = useState<IMovieModel | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movieData = await MovieService.getAll(1);
                setMovies(movieData);
            } catch (error) {
                console.error('Failed to fetch movies', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <h1>All Movies</h1>
            <div>
                {movies?.results.map((movie) => (
                    <div key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <p>{movie.release_date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movies;
