'use client';

import MovieList from '@/components/MovieList';
import MovieList from '@/components/MovieList';
import { useState } from 'react';


const HomePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'movies' | 'genres'>('movies');

    return (
        <div>
            <header>
                <button onClick={() => setActiveTab('movies')}>Movies</button>
                <button onClick={() => setActiveTab('genres')}>Genres</button>
            </header>
            <main>
                {activeTab === 'movies' && <MovieList />}
                {activeTab === 'genres' && <GenreList />}
            </main>
        </div>
    );
};

export default HomePage;

