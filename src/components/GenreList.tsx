'use client';

import React, { useEffect, useState } from 'react';
import { GenreService } from '@/service/genre.api.service';
import { IGenre } from '@/model/IGenreModel';
import styles from '@/styles/GenreList.module.css'; // Стилі для GenreList

const GenreList: React.FC = () => {
    const [genres, setGenres] = useState<IGenre[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreData = await GenreService.getGenres();
                setGenres(genreData);
            } catch (error) {
                console.error('Failed to fetch genres', error);
            }
        };

        fetchGenres();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Genres</h1>
            <ul className={styles.genreList}>
                {genres.map((genre) => (
                    <li key={genre.id} className={styles.genreItem}>
                        {genre.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GenreList;
