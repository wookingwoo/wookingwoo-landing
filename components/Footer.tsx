import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 py-8 mt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <Link href="/" className="text-xl font-bold text-primary">
                            Wookingwoo
                        </Link>
                    </div>

                    <div className="flex space-x-6">
                        <a
                            href="https://github.com/wookingwoo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary dark:text-gray-400"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/wookingwoo/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary dark:text-gray-400"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://wookingwoo.com/blog/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary dark:text-gray-400"
                        >
                            Blog
                        </a>
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                    © {new Date().getFullYear()} Wookingwoo. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer; 