
'use client';

import React, { useEffect, useState } from 'react';
import { MovieService } from '@/service/movie.api.service';
import { IMovieModel } from '@/model/IMovieModel';

const MovieList: React.FC = () => {
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
            {movies?.results.map((movie) => (
                <div key={movie.id}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <div>
                        <h2>{movie.title}</h2>
                        <p>{movie.release_date}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieList;


