'use client';

import React, { useEffect, useState } from 'react';
import { MovieService } from '@/service/movie.api.service';
import { IMovieModel } from '@/model/IMovieModel';
import Link from 'next/link';
import styles from '@/styles/MovieList.module.css'; // Оновлений шлях до стилів

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<IMovieModel | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movieData = await MovieService.getAll(currentPage);
                setMovies(movieData);
                setTotalPages(movieData.total_pages);
            } catch (error) {
                console.error('Failed to fetch movies', error);
            }
        };

        fetchMovies();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>All Movies</h1>
            {movies?.results.map((movie) => (
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
            ))}
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

export default MovieList;
