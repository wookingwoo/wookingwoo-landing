import React from 'react';
import Link from 'next/link';

const footerLinks = [
    { label: 'GitHub', href: 'https://github.com/wookingwoo' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ronny-woo' },
    { label: 'Blog', href: 'https://blog.wookingwoo.com' },
    { label: 'Email', href: 'mailto:contact@wookingwoo.com' },
];

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white py-12 dark:border-slate-800/80 dark:bg-transparent">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="text-center md:text-left">
                        <Link
                            href="/"
                            className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                        >
                            wookingwoo
                        </Link>
                        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                            Developer &amp; Creator
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        {footerLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-gray-600 transition-colors hover:text-primary dark:text-slate-400 dark:hover:text-sky-300"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-100 pt-6 text-center text-sm text-gray-500 dark:border-white/5 dark:text-slate-500">
                    <p>© {new Date().getFullYear()} wookingwoo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
