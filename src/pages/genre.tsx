// src/pages/genres.tsx
import { NextPage } from 'next';
import Header from '@/components/Header';
import GenreList from '@/components/GenreList';

const GenresPage: NextPage = () => {
    return (
        <>
            <Header />
            <main style={{ padding: '2rem' }}>
                <GenreList />
            </main>
        </>
    );
};

export default GenresPage;
