import {NextPage} from 'next';
import Header from '@/components/Header';
import MovieList from '@/components/MovieList';


const MoviesPage: NextPage = () => {
    return (
        <div>
            <Header/>
            <main style={{padding: '2rem'}}>
                <MovieList/>
            </main>
        </div>
    );
};

export default MoviesPage;