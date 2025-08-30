'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  shortContent: string;
  image: { url: string; alt: string };
  category: { _id: string; name: string; slug: string };
  createdAt: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsRes = await fetch('/api/admin/blogs');
        const categoriesRes = await fetch('/api/admin/blog-categories');
        const blogsData = await blogsRes.json();
        const categoriesData = await categoriesRes.json();
        setBlogs(blogsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="bg-white min-h-screen -mt-14 md:mt-3">
      <div className="max-w-7xl mx-auto py-8 flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-blue-50 px-5 pt-1 pb-1 rounded-lg mb-4">
            <h1 className="text-3xl font-bold mb-2 text-[#040c33]">Blogs</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-red-50 p-4 rounded-lg">
                <Image
                  src={blog.image.url}
                  alt={blog.image.alt || 'Blog Image'}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-2 text-[#040c33]">{blog.title}</h3>
                <p className="text-blue-950 mt-2 line-clamp-3">{blog.shortContent}</p>
                <p className="text-blue-800 text-sm mt-2">
                  {blog.category.name} • {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <Link href={`/blogs/${blog.slug}`} className="text-red-600 mt-2 inline-block">
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full md:w-67 sticky top-6 h-fit space-y-5">
          {/* Categories */}
          <div className="bg-blue-50 p-5 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-[#040c33]">Categories</h2>
            <ul className="space-y-2 text-blue-950">
              {categories.map((cat) => (
                <li key={cat._id}>{cat.name}</li>
              ))}
            </ul>
          </div>

          {/* Archives (Static for now) */}
          <div className="bg-blue-50 p-5 rounded-lg shadow">
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

          {/* Tags */}
          <div className="bg-blue-50 p-5 rounded-lg shadow">
            <h2 className="text-xl font-semibold mt-6 mb-4 text-[#040c33]">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {blogs.flatMap(blog => blog.tags || []).map((tag, idx) => (
                <span key={idx} className="bg-gray-50 px-2 py-1 rounded shadow-md text-blue-950">{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPage;
