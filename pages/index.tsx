import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import TechStack from '../components/TechStack';
import TravelMap from '../components/TravelMap';
import { projects } from '../data/projects';
import { techCategories } from '../data/techStack';
import { travelLocations } from '../data/travelLocations';

const Home = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        wookingwoo world
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Developer & Creator
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex justify-center space-x-4"
                    >
                        <a
                            href="https://github.com/wookingwoo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-white text-blue-600 hover:bg-gray-100"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://blog.wookingwoo.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-transparent border border-white hover:bg-white hover:text-blue-600"
                        >
                            Blog
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="section-title">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="section-title">About Me</h2>

                    <div className="max-w-3xl mx-auto mb-16">
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">
                            I am a passionate developer focused on creating innovative web applications
                            and services that provide value to users. With expertise in both frontend and
                            backend technologies, I enjoy building complete, end-to-end solutions.
                        </p>

                        <div className="flex justify-center space-x-8 mb-12">
                            <a
                                href="https://github.com/wookingwoo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-primary dark:text-gray-300 flex flex-col items-center"
                            >
                                <svg className="h-8 w-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                GitHub
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ronny-woo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-primary dark:text-gray-300 flex flex-col items-center"
                            >
                                <svg className="h-8 w-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                                LinkedIn
                            </a>
                            <a
                                href="https://blog.wookingwoo.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-primary dark:text-gray-300 flex flex-col items-center"
                            >
                                <svg className="h-8 w-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M0 3a3 3 0 1 0 6 0 3 3 0 0 0 -6 0m9 18a3 3 0 1 0 6 0 3 3 0 0 0 -6 0m0 -9a3 3 0 1 0 6 0 3 3 0 0 0 -6 0m0 -9a3 3 0 1 0 6 0 3 3 0 0 0 -6 0m9 0a3 3 0 1 0 6 0 3 3 0 0 0 -6 0" />
                                </svg>
                                Blog
                            </a>
                            <a
                                href="mailto:contact@wookingwoo.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-primary dark:text-gray-300 flex flex-col items-center"
                            >
                                <svg className="h-8 w-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                Email
                            </a>
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold mb-8 text-center">Technical Skills</h3>
                    <TechStack categories={techCategories} />

                    <div className="mt-16">
                        <h3 className="text-2xl font-semibold mb-8 text-center">Hobbies</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                <h4 className="text-xl font-semibold mb-4">Drone Photography</h4>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    I'm passionate about capturing aerial perspectives with drones.
                                    Exploring new heights and angles allows me to see the world from
                                    a different perspective.
                                </p>
                                <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
                                    {/* Placeholder for drone image */}
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        <img src="/images/hobbies/drone.jpg" alt="Drone Photography" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                <h4 className="text-xl font-semibold mb-4">World Travel</h4>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Traveling allows me to experience different cultures, meet new people,
                                    and gather inspiration from around the world. Below is a map of countries I've visited.
                                </p>
                                <TravelMap locations={travelLocations} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="section-title">Get In Touch</h2>
                    <div className="max-w-md mx-auto text-center">
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                            Just want to say hello? Feel free to reach out!
                        </p>
                        <a
                            href="mailto:contact@wookingwoo.com"
                            className="btn btn-primary text-lg px-8 py-3"
                        >
                            Email Me
                        </a>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Home; 