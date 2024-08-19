'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/styles/header.module.css';

const ThemeToggle: React.FC = () => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

    // Зберігаємо вибір теми в localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkTheme(savedTheme === 'dark');
            document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        } else {
            document.body.classList.toggle('dark-theme', isDarkTheme);
        }
    }, [isDarkTheme]);

    const toggleTheme = () => {
        setIsDarkTheme(prev => {
            const newTheme = !prev;
            document.body.classList.toggle('dark-theme', newTheme);
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
    };

    return (
        <button className={styles.themeToggleButton} onClick={toggleTheme}>
            {isDarkTheme ? '🌙' : '☀️'}
        </button>
    );
};

export default ThemeToggle;
//цю штуку я теж вкрав, але реалізувати так і не вдалося
