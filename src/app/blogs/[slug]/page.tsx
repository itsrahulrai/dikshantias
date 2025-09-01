'use client';

import React from 'react';
import BlogDetails from '@/component/BlogDetails';

type PageProps = {
  params: Awaited<{ slug: string }>; // unwraps Promise
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <BlogDetails slug={slug} />;
};

export default Page;
