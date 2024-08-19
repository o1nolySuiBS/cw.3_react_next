import React from 'react';
import styles from '@/styles/header.module.css';

interface HeaderProps {
    activeTab: 'movies' | 'genres';
    onTabChange: (tab: 'movies' | 'genres') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className={styles.header}>
            <button
                className={`${styles.tabButton} ${activeTab === 'movies' ? styles.active : ''}`}
                onClick={() => onTabChange('movies')}
            >
                Movies
            </button>
            <button
                className={`${styles.tabButton} ${activeTab === 'genres' ? styles.active : ''}`}
                onClick={() => onTabChange('genres')}
            >
                Genres
            </button>
        </div>
    );
};

export default Header;
