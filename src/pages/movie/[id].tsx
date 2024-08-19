'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MovieService } from '@/service/movie.api.service';
import { IMovie } from '@/model/IMovieModel';
import styles from '@/styles/MovieDetails.module.css';
import Link from 'next/link';
import Header from '@/components/Header';

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

    const handleStarClick = () => {
        router.push(`https://youtu.be/MVbNHCstkqY?si=KISG7wD--qVhLQ8J`);
    };

    const renderRatingStars = (rating: number) => {
        const totalStars = 10;
        const filledStars = Math.round(rating / 1);
        const emptyStars = totalStars - filledStars;

        return (
            <div className={styles.ratingStars}>
                {'★'.repeat(filledStars).split('').map((star, index) => (
                    <span key={`filled-${index}`} className={styles.star} onClick={handleStarClick}>
                        {star}
                    </span>
                ))}
                {'☆'.repeat(emptyStars).split('').map((star, index) => (
                    <span key={`empty-${index}`} className={styles.star} onClick={handleStarClick}>
                        {star}
                    </span>
                ))}
            </div>
        );
    };
/*Знаю, що зірочки кака, але я інших чомусь приєднати не зміг :( */
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
            <div className={styles.rating}>
                <strong>Rating:</strong> {renderRatingStars(movie.vote_average)}
            </div>
        </div>
    );
};

export default MovieDetails;
