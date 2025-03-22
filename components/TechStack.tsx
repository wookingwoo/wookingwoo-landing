import React from 'react';
import { motion } from 'framer-motion';

type TechCategory = {
    name: string;
    technologies: string[];
};

type TechStackProps = {
    categories: TechCategory[];
};

const TechStack = ({ categories }: TechStackProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
                <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                        {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {category.technologies.map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
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