import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getNextTheme, resolveInitialTheme, THEME_STORAGE_KEY, Theme } from '../lib/theme';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

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
    const [isScrolled, setIsScrolled] = useState(false);

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

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 8);

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isDark = theme === 'dark';
    const isSolid = isScrolled || isMenuOpen;

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
                isSolid
                    ? 'border-gray-200/70 bg-white/80 shadow-sm backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/85 dark:shadow-lg dark:shadow-black/20'
                    : 'border-transparent bg-transparent'
            }`}
        >
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-gray-900 transition-opacity hover:opacity-80 dark:text-white"
                >
                    wookingwoo
                </Link>

                <div className="flex items-center gap-3 md:gap-8">
                    {/* Desktop navigation */}
                    <nav className="hidden items-center gap-8 md:flex">
                        {navLinks.map(link => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-slate-300 dark:hover:text-sky-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border dark:border-slate-800/80 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:bg-sky-400/10 dark:hover:text-sky-300"
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
                        className="rounded-full p-2 text-gray-500 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-slate-300 dark:hover:bg-sky-400/10 dark:hover:text-sky-300 md:hidden"
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
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-navigation"
                        className="overflow-hidden md:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        <div className="container mx-auto space-y-1 border-t border-gray-100 px-4 py-3 dark:border-slate-800/80">
                            {navLinks.map(link => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="block rounded-lg px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary dark:text-slate-300 dark:hover:bg-sky-400/10 dark:hover:text-sky-300"
                                    onClick={toggleMenu}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
