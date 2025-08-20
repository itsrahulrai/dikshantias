'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Sample image data (replace with your own images)
const galleryImages = [
    { id: 1, src: '/img/gallery/gallery-1.webp', alt: 'Nature 1' },
    { id: 2, src: '/img/gallery/gallery-2.webp', alt: 'Nature 2' },
    { id: 3, src: '/img/gallery/gallery-3.webp', alt: 'Nature 3' },
    { id: 4, src: '/img/gallery/gallery-4.webp', alt: 'Nature 4' },
    { id: 5, src: '/img/gallery/gallery-5.webp', alt: 'Nature 5' },
    { id: 6, src: '/img/gallery/gallery-6.webp', alt: 'Nature 6' },
    { id: 6, src: '/img/gallery/gallery-7.webp', alt: 'Nature 6' },
    { id: 6, src: '/img/gallery/gallery-8.webp', alt: 'Nature 6' },

];

const GalleryPage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedAlt, setSelectedAlt] = useState<string | null>(null);

    const openModal = (src: string, alt: string) => {
        setSelectedImage(src);
        setSelectedAlt(alt);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setSelectedAlt(null);
    };

    return (
        <div className="py-12">
            <div className="container max-w-7xl mx-auto px-2 md:px-0">
                <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-center mb-12 text-gray-900">Our Portfolio</h1>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {galleryImages.map((image) => (
                        <motion.div
                            key={image.id}
                            className="relative aspect-square overflow-hidden rounded-lg shadow-xl cursor-pointer border-8 border-white"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => openModal(image.src, image.alt)}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Modal Popup */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                        >
                            <motion.div
                                className="relative max-w-4xl w-full"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Image
                                    src={selectedImage}
                                    alt={selectedAlt || 'Gallery Image'}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto rounded-lg"
                                    sizes="100vw"
                                />
                                <button
                                    className="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg hover:bg-gray-200 transition"
                                    onClick={closeModal}
                                >
                                    &times;
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default GalleryPage;