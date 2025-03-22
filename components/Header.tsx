import React, { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow-sm dark:bg-gray-900">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-primary">
                    Wookingwoo
                </Link>

                {/* Mobile menu button */}
                <button
                    type="button"
                    className="md:hidden text-gray-500 focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </button>

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
            </div>

            {/* Mobile navigation */}
            {isMenuOpen && (
                <div className="md:hidden">
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