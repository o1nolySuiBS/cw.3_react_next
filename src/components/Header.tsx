'use client';

import React, {useState, useCallback} from 'react';
import styles from '@/styles/header.module.css';
import {MovieService} from '@/service/movie.api.service';

interface HeaderProps {
    activeTab: 'movies' | 'genres';
    onTabChange: (tab: 'movies' | 'genres') => void;
}

const Header: React.FC<HeaderProps> = ({activeTab, onTabChange}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleTabChange = (tab: 'movies' | 'genres') => {
        onTabChange(tab);
    };

    const handleSearch = async (query: string) => {
        if (query.trim()) {
            try {
                const results = await MovieService.searchMovies(query, 1);
                setSearchResults(results.results);
            } catch (error) {
                console.error('Failed to search movies', error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'movies' ? styles.active : ''}`}
                    onClick={() => handleTabChange('movies')}
                >
                    Movies
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'genres' ? styles.active : ''}`}
                    onClick={() => handleTabChange('genres')}
                >
                    Genres
                </button>
            </div>
            <div className={styles.searchWrapper}>
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    className={styles.searchInput}/>
                {searchQuery && (
                    <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.show : ''}`}>
                        {searchResults.length > 0 ? (
                            searchResults.map((movie) => (
                                <div key={movie.id} className={styles.dropdownItem}>
                                    <a href={`/movie/${movie.id}`} className={styles.dropdownLink}>
                                        {movie.title}
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div className={styles.dropdownItem}>No results found</div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
// зірочки я вкрав в когось на гітхабі, як і інпут з стилями, а перевірки дієздатності писав чатгпт :(