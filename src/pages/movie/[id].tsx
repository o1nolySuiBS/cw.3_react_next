'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MovieService } from '@/service/movie.api.service';
import { IMovie } from '@/model/IMovieModel';
import styles from '@/styles/MovieDetails.module.scss';
import Link from 'next/link';

const MovieDetails: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [movie, setMovie] = useState<IMovie | null>(null);
    const [userRating, setUserRating] = useState<number | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (id) {
                try {
                    const movieData = await MovieService.getById(parseInt(id as string));
                    setMovie(movieData);

                    const savedRating = localStorage.getItem(`movie-${id}-rating`);
                    if (savedRating) {
                        setUserRating(Number(savedRating));
                    } else {
                        setUserRating(movieData.vote_average);
                    }
                } catch (error) {
                    console.error('Failed to fetch movie details', error);
                }
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleStarClick = (rating: number) => {
        setUserRating(rating);
        localStorage.setItem(`movie-${id}-rating`, rating.toString());
    };

    const renderRatingStars = (rating: number) => {
        const totalStars = 10;
        const filledStars = Math.round(rating);
        const emptyStars = totalStars - filledStars;

        return (
            <div className={styles.ratingStars}>
                {'★'.repeat(filledStars).split('').map((star, index) => (
                    <span
                        key={`filled-${index}`}
                        className={`${styles.star} ${styles.filled}`}
                        onClick={() => handleStarClick(index + 1)}
                    >
                        {star}
                    </span>
                ))}
                {'☆'.repeat(emptyStars).split('').map((star, index) => (
                    <span
                        key={`empty-${index}`}
                        className={styles.star}
                        onClick={() => handleStarClick(filledStars + index + 1)}
                    >
                        {star}
                    </span>
                ))}
            </div>
        );
    };

    if (!movie) return <div>Loading...</div>;

    return (
        <div className={styles.container}>

            <h1 className={styles.title}>{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
            />
            <p className={styles.releaseDate}><strong>Release Date:</strong> {movie.release_date}</p>
            <p className={styles.overview}><strong>Overview:</strong> {movie.overview}</p>
            <div className={styles.rating}>
                <strong>Rating:</strong> {renderRatingStars(userRating ?? movie.vote_average)}
            </div>
            <p className={styles.genres}>
                <strong>Genres:</strong>
                {movie.genres.map(genre => (
                    <Link key={genre.id} className={styles.genreLink} href={`/genre/${genre.id}`}>
                        {genre.name}
                    </Link>
                ))}

            </p>
            <Link href="/" className={styles.backButton}>
                Back to Movies
            </Link>
        </div>
    );
};

export default MovieDetails;
