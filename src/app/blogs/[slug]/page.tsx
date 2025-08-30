'use client';

import React from 'react';
import BlogDetails from '@/component/BlogDetails';

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return <BlogDetails slug={params.slug} />;
};

export default Page;
