// components/Header.tsx
'use client';

interface HeaderProps {
    setActiveTab: (tab: 'movies' | 'genres') => void;
}

const Header: React.FC<HeaderProps> = ({ setActiveTab }) => {
    return (
        <header>
            <nav>
                <button onClick={() => setActiveTab('movies')}>Movies</button>
                <button onClick={() => setActiveTab('genres')}>Genres</button>
            </nav>
        </header>
    );
};

export default Header;


