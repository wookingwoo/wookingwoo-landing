import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export type Project = {
    id: string;
    title: string;
    description: string;
    url: string;
    demoVideo?: string;
    thumbnail: string;
};

type ProjectCardProps = {
    project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <motion.div
            className="project-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative h-48 w-full">
                <Image
                    src={project.thumbnail || '/images/placeholder.jpg'}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={project.thumbnail === '/images/projects/busition.jpg'}
                    style={{ objectFit: "cover" }}
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary text-sm"
                    >
                        Visit Project
                    </a>

                    {project.demoVideo && (
                        <a
                            href={project.demoVideo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-red-600 text-white hover:bg-red-700 text-sm"
                        >
                            Watch Demo
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard; 