import React from 'react';
import { motion } from 'framer-motion';
import type { TechCategory } from '../data/types';

type TechStackProps = {
    categories: TechCategory[];
};

const TechStack = ({ categories }: TechStackProps) => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
                <motion.div
                    key={index}
                    className="rounded-2xl border border-gray-200/70 bg-white p-6 shadow-md transition-colors hover:border-primary/30 dark:border-slate-700/70 dark:bg-slate-800/80 dark:shadow-xl dark:shadow-black/30 dark:ring-1 dark:ring-white/5 dark:hover:border-sky-400/30"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <h3 className="mb-4 flex items-center gap-2.5 text-lg font-bold tracking-tight text-gray-900 dark:text-slate-100">
                        <span
                            className="h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 to-violet-500"
                            aria-hidden="true"
                        />
                        {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {category.technologies.map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-sky-400/10 dark:text-sky-200 dark:ring-1 dark:ring-sky-300/10 dark:hover:bg-sky-400/20"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default TechStack;
