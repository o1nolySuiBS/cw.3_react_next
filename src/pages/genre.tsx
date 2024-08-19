// src/pages/genres.tsx
import {NextPage} from 'next';
import GenreList from '@/components/GenreList';
import Header from '@/components/Header';

const GenresPage: NextPage = () => {
    return (
        <div>
            <Header/>
            <GenreList/>

        </div>
    );
};

export default GenresPage;


