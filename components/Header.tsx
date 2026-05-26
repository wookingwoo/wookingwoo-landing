import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getNextTheme, resolveInitialTheme, THEME_STORAGE_KEY, Theme } from '../lib/theme';

const readStoredTheme = () => {
    try {
        return window.localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
        return null;
    }
};

const writeStoredTheme = (theme: Theme) => {
    try {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        // Ignore storage failures so the current page can still switch themes.
    }
};

const applyTheme = (theme: Theme) => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
};

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState<Theme>('light');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleTheme = () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : theme;
        const nextTheme = getNextTheme(currentTheme);

        setTheme(nextTheme);
        applyTheme(nextTheme);
        writeStoredTheme(nextTheme);
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const syncTheme = () => {
            const nextTheme = resolveInitialTheme(readStoredTheme(), mediaQuery.matches);

            setTheme(nextTheme);
            applyTheme(nextTheme);
        };

        const handleSystemThemeChange = () => {
            if (!readStoredTheme()) {
                syncTheme();
            }
        };

        syncTheme();
        mediaQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, []);

    const isDark = theme === 'dark';

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-900">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-primary">
                    wookingwoo
                </Link>

                <div className="flex items-center gap-3 md:gap-8">
                    {/* Desktop navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-primary dark:text-gray-300">
                            Home
                        </Link>
                        <Link href="#projects" className="text-gray-700 hover:text-primary dark:text-gray-300">
                            Projects
                        </Link>
                        <Link href="#about" className="text-gray-700 hover:text-primary dark:text-gray-300">
                            About
                        </Link>
                        <Link href="#contact" className="text-gray-700 hover:text-primary dark:text-gray-300">
                            Contact
                        </Link>
                    </nav>

                    <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                        onClick={toggleTheme}
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDark ? (
                            <SunIcon className="h-5 w-5" aria-hidden="true" />
                        ) : (
                            <MoonIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                    </button>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="rounded-md p-2 text-gray-500 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-gray-300 md:hidden"
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-navigation"
                    >
                        {isMenuOpen ? (
                            <XMarkIcon className="h-6 w-6" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile navigation */}
            {isMenuOpen && (
                <div id="mobile-navigation" className="md:hidden">
                    <div className="container mx-auto px-4 py-2 space-y-2 bg-white dark:bg-gray-900">
                        <Link href="/"
                            className="block py-2 text-gray-700 hover:text-primary dark:text-gray-300"
                            onClick={toggleMenu}>
                            Home
                        </Link>
                        <Link href="#projects"
                            className="block py-2 text-gray-700 hover:text-primary dark:text-gray-300"
                            onClick={toggleMenu}>
                            Projects
                        </Link>
                        <Link href="#about"
                            className="block py-2 text-gray-700 hover:text-primary dark:text-gray-300"
                            onClick={toggleMenu}>
                            About
                        </Link>
                        <Link href="#contact"
                            className="block py-2 text-gray-700 hover:text-primary dark:text-gray-300"
                            onClick={toggleMenu}>
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
