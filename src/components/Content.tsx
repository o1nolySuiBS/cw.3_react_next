import React from 'react';
import Movies from './Movies';
import Genres from './Genres';

interface ContentProps {
    activeTab: 'movies' | 'genres';
}

const Content: React.FC<ContentProps> = ({ activeTab }) => {
    return (
        <main style={contentStyle}>
            {activeTab === 'movies' && <Movies />}
            {activeTab === 'genres' && <Genres />}
        </main>
    );
};

const contentStyle: React.CSSProperties = {
    padding: '2rem',
};

export default Content;