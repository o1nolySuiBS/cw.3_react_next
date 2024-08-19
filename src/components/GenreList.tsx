// components/GenreList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { GenreService } from '@/service/genre.api.service';
import { IGenre } from '@/model/IGenreModel';

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
        <div>
            <h1>Genres</h1>
            <ul>
                {genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default GenreList;
