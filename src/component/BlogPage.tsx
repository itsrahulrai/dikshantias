'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogPage: React.FC = () => {
    return (
        <>
         <div className="bg-white min-h-screen -mt-14 md:mt-3">
            <div className="max-w-7xl mx-auto py-8 flex flex-col md:flex-row gap-8">
                {/* Main Content */}
                <main className="flex-1">
                    <div className='bg-blue-50 px-5 pt-1 pb-1 rounded-lg mb-4'>
                        <h1 className="text-3xl font-bold mb-2 text-[#040c33]">Blog</h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-red-50 p-4 rounded-lg">
                                <Image
                                    src="/img/gallery/gallery-1.webp"
                                    alt="Blog Post"
                                    width={600}
                                    height={300}
                                    className="w-full h-48 object-cover rounded"
                                />
                                <h3 className="text-lg font-semibold mt-2 text-[#040c33]">6 Years Since the Abrogation of Article 370</h3>
                                <p className="text-blue-950 mt-2">
                                    Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry...
                                </p>
                                <p className="text-blue-800 text-sm mt-2">Blog • 20/08/2022</p>
                                <Link href="/blog-details" className="text-red-600 mt-2 inline-block">Read More →</Link>
                            </div>
                        ))}
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
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-gray-50 px-2 py-1 rounded shadow-md text-blue-950">Course</span>
                            <span className="bg-gray-50 px-2 py-1 rounded shadow-md text-blue-950">Designer</span>
                            <span className="bg-gray-50 px-2 py-1 rounded shadow-md text-blue-950">SEO</span>
                            <span className="bg-gray-50 px-2 py-1 rounded shadow-md text-blue-950">ThimPress</span>
                            <span className="bg-gray-50 px-2 py-1 rounded shadow-md text-blue-950">WordPress</span>
                        </div>
                    </div>

                </aside>
            </div >
        </div >
        </>
       
    );
};

export default BlogPage;
