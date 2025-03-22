import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
    children: ReactNode;
    title?: string;
    description?: string;
};

const Layout = ({
    children,
    title = 'Wookingwoo Portfolio',
    description = 'Wookingwoo\'s personal portfolio website showcasing projects and skills',
}: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
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