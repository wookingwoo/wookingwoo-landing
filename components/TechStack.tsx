import React from 'react';
import { motion } from 'framer-motion';
import type { TechCategory } from '../data/types';

type TechStackProps = {
    categories: TechCategory[];
};

const TechStack = ({ categories }: TechStackProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
                <motion.div
                    key={index}
                    className="rounded-lg border border-gray-100 bg-white p-6 shadow-md dark:border-slate-800/80 dark:bg-slate-900/80 dark:shadow-xl dark:shadow-black/30"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-slate-100">
                        {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {category.technologies.map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-sky-400/10 dark:text-sky-200 dark:ring-1 dark:ring-sky-300/10"
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
