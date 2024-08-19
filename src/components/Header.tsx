'use client';

import React, { useState } from 'react';
import styles from '@/styles/header.module.css';
import { MovieService } from '@/service/movie.api.service';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
    activeTab: 'movies' | 'genres';
    onTabChange: (tab: 'movies' | 'genres') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
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
                setIsDropdownOpen(true); // Відкриваємо меню після отримання результатів
            } catch (error) {
                console.error('Failed to search movies', error);
            }
        } else {
            setSearchResults([]);
            setIsDropdownOpen(false); // Закриваємо меню, якщо пошуковий запит порожній
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };

    const handleDropdownClick = (movieId: number) => {
        setSearchQuery('');
        setSearchResults([]);
        setIsDropdownOpen(false);
        // Перехід на сторінку фільму
        window.location.href = `/movie/${movieId}`;
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
                    className={styles.searchInput}
                />
                {searchQuery && isDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                        {searchResults.length > 0 ? (
                            searchResults.map((movie) => (
                                <div key={movie.id} className={styles.dropdownItem} onClick={() => handleDropdownClick(movie.id)}>
                                    <a className={styles.dropdownLink}>{movie.title}</a>
                                </div>
                            ))
                        ) : (
                            <div className={styles.dropdownItem}>No results found</div>
                        )}
                    </div>
                )}
            </div>
            <ThemeToggle />
        </header>
    );
};

export default Header;

//інпут я вкрав, стилі робив гпт перевірки дієздатності теж писав чатгпт, коментарі
// теж його коли кидав код на оптимізацію
// бо довго грузив вкладки, не знав з чим це було пов'язано :(