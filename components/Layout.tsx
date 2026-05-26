import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
    children: ReactNode;
    title?: string;
    description?: string;
};

const siteUrl = 'https://wookingwoo.com';
const siteName = 'wookingwoo world';

const Layout = ({
    children,
    title = 'wookingwoo world',
    description = 'wookingwoo\'s personal portfolio website showcasing projects and skills',
}: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="index, follow" />
                <meta name="theme-color" content="#0070f3" />
                <link rel="canonical" href={siteUrl} />
                <link rel="icon" href="/icons/favicon.ico" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:url" content={siteUrl} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
            </Head>

            <Header />

            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
