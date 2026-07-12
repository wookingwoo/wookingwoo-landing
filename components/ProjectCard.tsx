import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '../data/types';

type ProjectCardProps = {
    project: Project;
    index?: number;
};

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
    const isPriorityImage = project.thumbnail === '/images/projects/busition.jpg';

    return (
        <motion.article
            className="project-card group flex flex-col overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-md dark:border-slate-700/70 dark:bg-slate-800/80 dark:shadow-xl dark:shadow-black/30 dark:ring-1 dark:ring-white/5"
            whileHover={{ y: -6 }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: (index % 3) * 0.1, ease: 'easeOut' },
            }}
            viewport={{ once: true, margin: '-60px' }}
        >
            <div className="relative h-52 w-full flex-shrink-0 overflow-hidden">
                <Image
                    src={project.thumbnail || '/images/placeholder.jpg'}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={isPriorityImage}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="flex flex-grow flex-col p-6">
                <h3 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-slate-100">
                    {project.title}
                </h3>
                <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600 dark:text-slate-300">
                    {project.description}
                </p>
                <div className="flex items-center justify-between">
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-blue-700 dark:text-sky-300 dark:hover:text-sky-200"
                        aria-label={`Visit ${project.title}`}
                    >
                        Visit Project
                        <svg
                            className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M21 12H3" />
                        </svg>
                    </a>

                    <div className="flex gap-3">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 transition-colors hover:text-gray-900 dark:text-slate-400 dark:hover:text-sky-300"
                                title="GitHub"
                                aria-label={`View ${project.title} on GitHub`}
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                        )}

                        {project.demoVideo && (
                            <a
                                href={project.demoVideo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-500 transition-colors hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                                title="Watch Demo"
                                aria-label={`Watch ${project.title} demo`}
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

export default ProjectCard;
