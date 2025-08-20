'use client';

import { useState } from 'react';
import { Calendar, Clock, ArrowRight, Bell, BookOpen, FileText, TrendingUp } from 'lucide-react';
import Image from 'next/image';


interface QuickResource {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

const DailyBlog = () => {

  const quickResources: QuickResource[] = [
    {
      title: 'Trending',
      subtitle: 'Daily & Monthly Updates',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-blue-600'
    },
    // {
    //   title: 'Mock Tests',
    //   subtitle: 'Practice Test Series',
    //   icon: <FileText className="w-5 h-5" />,
    //   color: 'text-green-600'
    // },
    // {
    //   title: 'Study Material',
    //   subtitle: 'Notes & Resources',
    //   icon: <BookOpen className="w-5 h-5" />,
    //   color: 'text-purple-600'
    // }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Announcement':
        return 'text-pink-600 bg-pink-50';
      case 'Results':
        return 'text-green-600 bg-green-50';
      case 'Event':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <section className="py-10 -mt-6 mb-6 md:mt-10 md:mb-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">        
        {/* Section Header */}    
        <div className="grid lg:grid-cols-1">
          <div>
            {/* Quick Resources */}
            <div className="bg-red-100 rounded-2xl p-6 shadow-md">
              <h3 className="text-[18px] md:text-3xl font-bold text-[#00072c] mb-6">Daily Blog</h3>
              
              <div className="space-y-4">
                {quickResources.map((resource, index) => (
                  <div key={index} className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 cursor-pointer group">
                    <div className={`${resource.color} mr-4 mt-1`}>
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#00072c] group-hover:text-pink-600 transition-colors duration-300">
                        {resource.title}
                      </h4>
                      <p className="text-sm text-[#081347] mt-1">{resource.subtitle}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-red-600 group-hover:text-pink-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyBlog;