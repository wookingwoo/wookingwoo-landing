import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="mt-12 border-t border-gray-200 bg-white py-8 dark:border-slate-800/80 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <Link href="/" className="text-xl font-bold text-primary dark:text-sky-300">
                            wookingwoo
                        </Link>
                    </div>

                    <div className="flex space-x-6">
                        <a
                            href="https://github.com/wookingwoo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary dark:text-slate-400 dark:hover:text-sky-300"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ronny-woo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary dark:text-slate-400 dark:hover:text-sky-300"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://blog.wookingwoo.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary dark:text-slate-400 dark:hover:text-sky-300"
                        >
                            Blog
                        </a>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500 dark:text-slate-500">
                    © {new Date().getFullYear()} wookingwoo. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
