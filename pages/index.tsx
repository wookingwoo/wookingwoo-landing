import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import TechStack from '../components/TechStack';
import { projects } from '../data/projects';
import { techCategories } from '../data/techStack';
import { travelLocations } from '../data/travelLocations';

const TravelMap = dynamic(() => import('../components/TravelMap'), {
    ssr: false,
    loading: () => (
        <div
            className="h-[252px] rounded-xl border border-gray-100 bg-gray-100 dark:border-slate-700/70 dark:bg-slate-800/80 dark:ring-1 dark:ring-white/5"
            role="status"
            aria-label="Loading travel map"
        />
    ),
});

const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: 'easeOut' },
} as const;

const Home = () => {
    const technologyCount = techCategories.reduce(
        (total, category) => total + category.technologies.length,
        0
    );

    const stats = [
        { value: projects.length, label: 'Projects shipped' },
        { value: technologyCount, label: 'Technologies' },
        { value: travelLocations.length, label: 'Countries visited' },
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
                {/* Aurora backdrop */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                    <div className="bg-grid absolute inset-0" />
                    <div className="absolute -top-32 left-1/2 -ml-[420px] h-[520px] w-[840px] rounded-full bg-gradient-to-r from-sky-400/30 via-violet-400/20 to-fuchsia-400/20 blur-3xl will-change-transform motion-safe:animate-aurora dark:from-sky-500/20 dark:via-violet-500/15 dark:to-fuchsia-500/10" />
                    <div className="absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full bg-sky-300/30 blur-3xl will-change-transform motion-safe:animate-aurora-slow dark:bg-sky-500/10" />
                    <div className="absolute -bottom-24 -right-24 h-[380px] w-[380px] rounded-full bg-violet-300/30 blur-3xl will-change-transform motion-safe:animate-aurora dark:bg-violet-500/10" />
                </div>

                <div className="container relative z-10 px-4 py-32 text-center">
                    <motion.div
                        className="mb-8 flex justify-center"
                        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <span className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-800/80 dark:text-slate-200 dark:ring-1 dark:ring-white/5">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                            Developer &amp; Creator
                        </span>
                    </motion.div>

                    <motion.h1
                        className="mb-6 text-5xl font-bold tracking-tighter text-gray-900 dark:text-white sm:text-7xl md:text-8xl"
                        initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                    >
                        wookingwoo{' '}
                        <span className="text-gradient font-display font-normal italic">world</span>
                    </motion.h1>

                    <motion.p
                        className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-slate-300 md:text-xl"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                    >
                        Hello! I&apos;m a developer who loves creating innovative solutions. I&apos;m
                        passionate about developing user-centric services and enjoy learning and
                        applying new technologies.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
                    >
                        <a href="#projects" className="btn btn-primary px-8 py-3 text-base">
                            View Projects
                        </a>
                        <a href="#about" className="btn btn-ghost px-8 py-3 text-base">
                            About Me
                        </a>
                    </motion.div>
                </div>

                <div className="absolute inset-x-0 bottom-8 flex justify-center">
                    <motion.a
                        href="#projects"
                        aria-label="Scroll to projects"
                        className="text-gray-400 transition-colors hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 8, 0] }}
                        transition={{
                            opacity: { delay: 1, duration: 0.6 },
                            y: { delay: 1, duration: 2, repeat: Infinity, ease: 'easeInOut' },
                        }}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </motion.a>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="border-y border-gray-100 bg-gray-50/80 py-24 dark:border-white/5 dark:bg-slate-900/25">
                <div className="container mx-auto px-4">
                    <motion.div className="mb-14 text-center" {...reveal}>
                        <span className="eyebrow">Portfolio</span>
                        <h2 className="section-title">Projects</h2>
                        <p className="section-lead">
                            Products and experiments I&apos;ve designed, built, and shipped end-to-end.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24">
                <div className="container mx-auto px-4">
                    <motion.div className="mb-12 text-center" {...reveal}>
                        <span className="eyebrow">About</span>
                        <h2 className="section-title">About Me</h2>
                        <p className="section-lead">
                            I am a passionate developer focused on creating innovative web applications
                            and services that provide value to users. With expertise in both frontend and
                            backend technologies, I enjoy building complete, end-to-end solutions.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div className="mx-auto mb-14 grid max-w-2xl grid-cols-3 gap-8" {...reveal}>
                        {stats.map(stat => (
                            <div key={stat.label} className="text-center">
                                <p className="text-gradient text-4xl font-bold tracking-tight md:text-5xl">
                                    {stat.value}
                                </p>
                                <p className="mt-2 text-sm font-medium text-gray-500 dark:text-slate-400">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Social links */}
                    <motion.div className="mb-20 flex flex-wrap justify-center gap-6 md:gap-10" {...reveal}>
                        <a
                            href="https://github.com/wookingwoo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-2 text-gray-600 hover:text-primary dark:text-slate-300 dark:hover:text-sky-300"
                        >
                            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10 dark:border-slate-700/70 dark:bg-slate-800/80 dark:ring-1 dark:ring-white/5 dark:group-hover:border-sky-400/40">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <span className="text-sm font-medium">GitHub</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ronny-woo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-2 text-gray-600 hover:text-primary dark:text-slate-300 dark:hover:text-sky-300"
                        >
                            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10 dark:border-slate-700/70 dark:bg-slate-800/80 dark:ring-1 dark:ring-white/5 dark:group-hover:border-sky-400/40">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </span>
                            <span className="text-sm font-medium">LinkedIn</span>
                        </a>
                        <a
                            href="https://blog.wookingwoo.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-2 text-gray-600 hover:text-primary dark:text-slate-300 dark:hover:text-sky-300"
                        >
                            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10 dark:border-slate-700/70 dark:bg-slate-800/80 dark:ring-1 dark:ring-white/5 dark:group-hover:border-sky-400/40">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M0 3a3 3 0 1 0 6 0 3 3 0 0 0 -6 0m9 18a3 3 0 1 0 6 0 3 3 0 0 0 -6 0m0 -9a3 3 0 1 0 6 0 3 3 0 0 0 -6 0m0 -9a3 3 0 1 0 6 0 3 3 0 0 0 -6 0m9 0a3 3 0 1 0 6 0 3 3 0 0 0 -6 0" />
                                </svg>
                            </span>
                            <span className="text-sm font-medium">Blog</span>
                        </a>
                        <a
                            href="mailto:contact@wookingwoo.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-2 text-gray-600 hover:text-primary dark:text-slate-300 dark:hover:text-sky-300"
                        >
                            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10 dark:border-slate-700/70 dark:bg-slate-800/80 dark:ring-1 dark:ring-white/5 dark:group-hover:border-sky-400/40">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                            </span>
                            <span className="text-sm font-medium">Email</span>
                        </a>
                    </motion.div>

                    <motion.div className="mb-8 text-center" {...reveal}>
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
                            Technical Skills
                        </h3>
                    </motion.div>
                    <TechStack categories={techCategories} />

                    <div className="mt-20">
                        <motion.div className="mb-8 text-center" {...reveal}>
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
                                Hobbies
                            </h3>
                        </motion.div>

                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                            <motion.div
                                className="group rounded-2xl border border-gray-200/70 bg-white p-6 shadow-md dark:border-slate-700/70 dark:bg-slate-800/80 dark:shadow-xl dark:shadow-black/30 dark:ring-1 dark:ring-white/5"
                                {...reveal}
                            >
                                <div className="mb-4 flex items-center">
                                    <h4 className="text-xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
                                        Drone Photography
                                    </h4>
                                    <a
                                        href="https://www.youtube.com/@ronny-drone"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                        aria-label="Visit Ronny Drone on YouTube"
                                    >
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                        </svg>
                                    </a>
                                </div>
                                <p className="mb-4 leading-relaxed text-gray-600 dark:text-slate-300">
                                    I&apos;m passionate about capturing aerial perspectives with drones.
                                    Exploring new heights and angles allows me to see the world from
                                    a different perspective.
                                </p>
                                <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-200 dark:bg-slate-800">
                                    <Image
                                        src="/images/hobbies/drone.jpg"
                                        alt="Drone Photography"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                className="rounded-2xl border border-gray-200/70 bg-white p-6 shadow-md dark:border-slate-700/70 dark:bg-slate-800/80 dark:shadow-xl dark:shadow-black/30 dark:ring-1 dark:ring-white/5"
                                {...reveal}
                            >
                                <h4 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
                                    World Travel
                                </h4>
                                <p className="mb-4 leading-relaxed text-gray-600 dark:text-slate-300">
                                    Traveling allows me to experience different cultures, meet new people,
                                    and gather inspiration from around the world. Below is a map of countries I&apos;ve visited.
                                </p>
                                <TravelMap locations={travelLocations} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative overflow-hidden py-28">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-sky-400/20 via-violet-400/15 to-fuchsia-400/15 blur-3xl dark:from-sky-500/10 dark:via-violet-500/10 dark:to-fuchsia-500/10"
                />
                <div className="container relative mx-auto px-4">
                    <motion.div className="mx-auto max-w-2xl text-center" {...reveal}>
                        <span className="eyebrow">Contact</span>
                        <h2 className="mb-6 text-4xl font-bold tracking-tighter text-gray-900 dark:text-white md:text-6xl">
                            Let&apos;s build something{' '}
                            <span className="text-gradient font-display font-normal italic">together</span>
                        </h2>
                        <p className="mb-10 text-lg text-gray-600 dark:text-slate-300">
                            Just want to say hello? Feel free to reach out!
                        </p>
                        <a
                            href="mailto:contact@wookingwoo.com"
                            className="btn btn-primary px-10 py-4 text-lg"
                        >
                            Email Me
                        </a>
                        <p className="mt-6 text-sm text-gray-500 dark:text-slate-400">
                            or write to{' '}
                            <a
                                href="mailto:contact@wookingwoo.com"
                                className="font-medium text-primary hover:underline dark:text-sky-300"
                            >
                                contact@wookingwoo.com
                            </a>
                        </p>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default Home;
