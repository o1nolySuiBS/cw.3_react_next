'use client';

import React, { useEffect, useState } from 'react';
import { GenreService } from '@/service/genre.api.service';
import Link from 'next/link';
import styles from '@/styles/MovieList.module.css';
import { useRouter } from 'next/router';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

interface MoviesResponse {
    results: Movie[];
    total_pages: number;
}

const GenreMoviesPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query; // отримання genreId з URL
    const [movies, setMovies] = useState<MoviesResponse | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            const fetchMoviesByGenre = async () => {
                setLoading(true);
                try {
                    const movieData = await GenreService.getByGenreIdMovies(id as string, currentPage);
                    setMovies(movieData);
                    setTotalPages(movieData.total_pages);
                } catch (error) {
                    console.error('Failed to fetch movies by genre', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchMoviesByGenre();
        }
    }, [id, currentPage]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) return <div>Loading...</div>;

    if (!movies || !movies.results || movies.results.length === 0) return <div>No movies found for this genre.</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Movies by Genre</h1>
            <Link href="/" className={styles.backButton}>
                Back to Movies
            </Link>

            {movies.results.length > 0 ? (
                movies.results.map((movie) => (
                    <div key={movie.id} className={styles.movieItem}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className={styles.poster}
                        />
                        <div className={styles.info}>
                            <Link href={`/movie/${movie.id}`} className={styles.title}>
                                {movie.title}
                            </Link>
                            <p className={styles.releaseDate}>{movie.release_date}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No movies found for this genre.</p>
            )}

            <div className={styles.pagination}>
                <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className={styles.pageInfo}>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default GenreMoviesPage;


