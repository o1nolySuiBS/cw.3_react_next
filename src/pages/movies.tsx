import {NextPage} from 'next';
import MovieList from '@/components/MovieList';





const MoviesPage: NextPage = () => {
    return (
        <div>
            <MovieList/>
        </div>
    );
};

export default MoviesPage;