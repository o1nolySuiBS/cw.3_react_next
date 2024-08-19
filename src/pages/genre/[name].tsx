import React, { useState, useEffect } from 'react';
import { MovieService } from '@/service/movie.api.service';
import { IMovie } from '@/model/IMovieModel';
import styles from '@/styles/MovieList.module.css';

interface MoviesByGenreProps {
    genreName: string;
}

const MoviesByGenre: React.FC<MoviesByGenreProps> = ({ genreName }) => {
    const [movies, setMovies] = useState<IMovie[]>([]);


    useEffect(() => {
        const fetchMovies = async () => {


                const data = await MovieService.searchMoviesByGenre(genreName);
                if (data.results) {
                    setMovies(data.results);


        };

        if (genreName) {
            fetchMovies();
        }
    }, [genreName]);



    return (
        <div className={styles.movieList}>
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <div key={movie.id} className={styles.movieItem}>
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                    </div>
                ))
            ) : (

            )}
        </div>
    );
};

export default MoviesByGenre;