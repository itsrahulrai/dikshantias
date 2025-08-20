'use client';
import { Book, CalendarDays, Globe, Star, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const BlogDetails: React.FC = () => {
    return (
        <>
            <div className="bg-white min-h-screen -mt-14 md:mt-3">
                <div className="max-w-7xl mx-auto py-8 flex flex-col md:flex-row gap-8 px-2 md:px-0">
                    {/* Main Content */}
                    <main className="flex-1">
                        <div className='pt-1 pb-1 rounded-lg mb-4 overflow-hidden'>
                            <Image src="/img/gallery/gallery-5.webp" width={1500} height={600} alt="blog-hero" className='rounded-xl' />
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <h1 className='font-bold text-xl md:text-3xl text-[#040c33]'>6 Years Since the Abrogation of Article 370</h1>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-blue-900 mb-4">
                                <div className="flex items-center gap-1">
                                    <CalendarDays className="w-4 h-4" />
                                    <span>August 1, 2025</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Book className="w-4 h-4" />
                                    <span>15 lessons</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4" />
                                    <span>review</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span>Writer</span>
                                </div>
                            </div>

                            <div className='content text-blue-950'>
                                <p>The abrogation of Article 370 was a defining constitutional moment in India’s history. While it aimed to foster integration, governance reform, and equality, the real test lies in building lasting peace, restoring democratic institutions, and ensuring the socio-economic upliftment of the people of Jammu & Kashmir.</p>
                                
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

                                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English.

                                    Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ‘lorem ipsum’ will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.

                                    If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                            </div>

                        </div>
                    </main>

                    {/* Sticky Sidebar */}
                    <aside className="w-full md:w-67 sticky top-6 h-fit space-y-5">
                        <div className='bg-blue-50 p-5 rounded-lg shadow '>
                            <h2 className="text-xl font-semibold mb-4 text-[#040c33]">Categories</h2>
                            <ul className="space-y-2 text-blue-950">
                                <li>Blog</li>
                                <li>Business</li>
                                <li>Coaching</li>
                                <li>Design / Branding</li>
                            </ul>
                        </div>
                        <div className='bg-blue-50 p-5 rounded-lg shadow '>
                            <h2 className="text-xl font-semibold mt-6 mb-4 text-[#040c33]">Archives</h2>
                            <ul className="space-y-2 text-blue-950">
                                <li>September 2022</li>
                                <li>August 2022</li>
                                <li>July 2022</li>
                                <li>June 2022</li>
                                <li>May 2022</li>
                                <li>March 2022</li>
                            </ul>
                        </div>
                        <div className='bg-blue-50 p-5 rounded-lg shadow '>
                            <h2 className="text-xl font-semibold mt-6 mb-4 text-[#040c33]">Tags</h2>
                            <div className="flex flex-wrap gap-2 text-blue-950">
                                <span className="bg-gray-50 px-2 py-1 rounded shadow-md">Course</span>
                                <span className="bg-gray-50 px-2 py-1 rounded shadow-md">Designer</span>
                                <span className="bg-gray-50 px-2 py-1 rounded shadow-md">SEO</span>
                                <span className="bg-gray-50 px-2 py-1 rounded shadow-md">ThimPress</span>
                                <span className="bg-gray-50 px-2 py-1 rounded shadow-md">WordPress</span>
                            </div>
                        </div>

                    </aside>
                </div >
            </div >
        </>

    );
};

export default BlogDetails;
