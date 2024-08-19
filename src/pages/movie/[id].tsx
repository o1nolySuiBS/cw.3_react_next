'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MovieService } from '@/service/movie.api.service';
import { IMovie } from '@/model/IMovieModel';
import styles from '@/styles/MovieDetails.module.css'; // Оновлений шлях
import Link from 'next/link'; // Додайте цей імпорт

const MovieDetails: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [movie, setMovie] = useState<IMovie | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (id) {
                try {
                    const movieData = await MovieService.getById(parseInt(id as string));
                    setMovie(movieData);
                } catch (error) {
                    console.error('Failed to fetch movie details', error);
                }
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
                <Link href="/" className={styles.backButton}>
                Back to Movies
            </Link>
            <h1 className={styles.title}>{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
            />
            <p className={styles.releaseDate}><strong>Release Date:</strong> {movie.release_date}</p>
            <p className={styles.overview}><strong>Overview:</strong> {movie.overview}</p>
            <p className={styles.rating}><strong>Rating:</strong> {movie.vote_average}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default MovieDetails;
