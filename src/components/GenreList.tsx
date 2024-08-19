'use client';

import React, {useEffect, useState} from 'react';
import {GenreService} from '@/service/genre.api.service';
import {IGenre} from '@/model/IGenreModel';
import styles from '@/styles/GenreList.module.css';
import Link from 'next/link';

const GenreList: React.FC = () => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

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

    const handleGenreClick = (genreId: number) => {
        setSelectedGenre(genreId);
    };

    return (
        <div>

            <div className={styles.container}>
                <h1 className={styles.heading}>Genres</h1>
                <ul className={styles.genreList}>
                    {genres.map((genre) => (
                        <li
                            key={genre.id}
                            className={`${styles.genreItem} ${selectedGenre === genre.id ? styles.selected : ''}`}
                            onClick={() => handleGenreClick(genre.id)}
                        >
                            <Link className={styles.Link} href={`genre/${genre.name}`}>{genre.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GenreList;
