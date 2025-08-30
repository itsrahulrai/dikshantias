'use client';

import { useEffect, useState } from 'react';
import { Book, CalendarDays, Star, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogDetailsProps {
  slug: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  shortContent: string;
  image: { url: string; alt: string };
  category: { _id: string; name: string; slug: string };
  tags: string[];
  postedBy: string;
  createdAt: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ slug }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogAndCategories = async () => {
      try {
        // Fetch blogs
        const blogRes = await fetch('/api/admin/blogs');
        const blogs: Blog[] = await blogRes.json();
        const currentBlog = blogs.find(b => b.slug === slug) || null;
        setBlog(currentBlog);

        // Fetch all categories
        const catRes = await fetch('/api/admin/blog-categories'); // Make sure this endpoint exists
        const catData: Category[] = await catRes.json();
        setCategories(catData);
      } catch (error) {
        console.error('Error fetching blog or categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndCategories();
  }, [slug]);

if (loading)
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg">
        <div className="flex space-x-3 mb-4">
          <div className="w-5 h-5 bg-red-500 rounded-full animate-bounce"></div>
          <div className="w-5 h-5 bg-orange-400 rounded-full animate-bounce delay-150"></div>
          <div className="w-5 h-5 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
        </div>
        <p className="text-gray-800 font-semibold text-lg">Loading blog details...</p>
      </div>
    </div>
  );



  if (!blog) return <p className="text-center py-10 text-red-600">Blog not found</p>;

  return (
    <div className="bg-white min-h-screen -mt-14 md:mt-3">
      <div className="max-w-7xl mx-auto py-8 flex flex-col md:flex-row gap-8 px-2 md:px-0">
        {/* Main Content */}
        <main className="flex-1">
          <div className="pt-1 pb-1 rounded-lg mb-4 overflow-hidden">
            <Image src={blog.image.url} width={1500} height={600} alt={blog.image.alt || 'Blog Image'} className="rounded-xl" />
          </div>

          <h1 className="font-bold text-xl md:text-3xl text-[#040c33]">{blog.title}</h1>

          <div className="flex items-center gap-4 text-sm text-blue-900 mb-4">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Book className="w-4 h-4" />
              <span>{blog.tags.length} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>review</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{blog.postedBy}</span>
            </div>
          </div>

          <div
            className="content text-blue-950"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </main>

        {/* Sidebar */}
        <aside className="w-full md:w-67 sticky top-6 h-fit space-y-5">
          {/* All Categories */}
          <div className="bg-blue-50 p-5 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-[#040c33]">Categories</h2>
            <ul className="space-y-2 text-blue-950">
              {categories.map(cat => (
                <li key={cat._id}>
                  <Link href={`/blog/${cat.slug}`} className="hover:text-red-600">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="bg-blue-50 p-5 rounded-lg shadow">
            <h2 className="text-xl font-semibold mt-6 mb-4 text-[#040c33]">Tags</h2>
            <div className="flex flex-wrap gap-2 text-blue-950">
              {blog.tags.map((tag, idx) => (
                <span key={idx} className="bg-gray-50 px-2 py-1 rounded shadow-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;
