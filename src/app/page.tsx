'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import MovieList from '@/components/MovieList';
import GenreList from '@/components/GenreList';

const HomePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'movies' | 'genres'>('movies');

    return (
        <div>
            <Header activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === 'movies' && <MovieList />}
            {activeTab === 'genres' && <GenreList />}
        </div>
    );
};

export default HomePage;
