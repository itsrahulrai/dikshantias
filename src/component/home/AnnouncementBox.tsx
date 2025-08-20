'use client'

import Link from 'next/link';
import React, { useState } from 'react';

interface Announcement {
  title: string;
  // details: string;
  // lastDate: string;
  // url: string;
  bgcolor: string;
}

const AnnouncementBox: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const announcements: Announcement[] = [
    {
      title: "GS/Complete Course/Foundation Course Pre-Foundation Course",
      // details: "Registration Open for 30th August -2025 (Offline/Online Live)",
      // lastDate: "Registration Last Date: 20th August-2025",
      // url:"#",
      bgcolor: "bg-purple-200"
    },
    {
      title: "GS/Complete Course/Foundation Course/ Pre-Foundation Course",
      // details: "Registration Open for 10th September -2025 (Offline/Online Live)",
      // lastDate: "Registration Last Date: 20th August-2025",
      // url:"#",
      bgcolor: "bg-yellow-200"
    },
    {
      title: "Advanced Test Series Program",
      // details: "Registration Open for 15th September -2025 (Online Mode)",
      // lastDate: "Registration Last Date: 25th August-2025",
      // url:"#",
      bgcolor: "bg-red-200"

    },
    {
      title: "Prelims + Mains Integrated Course",
      // details: "Registration Open for 5th October -2025 (Offline/Online Live)",
      // lastDate: "Registration Last Date: 30th August-2025",
      // url:"#",
      bgcolor: "bg-blue-200"
    }
  ];

  return (
    <div className="w-full mx-auto rounded-xl overflow-hidden">
      <h3 className="text-xl md:text-3xl font-bold mb-4 text-[#040c33] md:hidden lg:hidden xl:hidden pl-2 md:pl-0">
        New <span className="text-[#f43144]">Announcement</span>
      </h3>
      {/* Important Banner */}
      <div className="bg-blue-900 text-white text-center py-3 md:px-30 hidden md:block lg:block xl:block">
        <span className="text-sm font-bold bg-white text-red-600 px-3 py-1 rounded-sm ">
          IMPORTANT ANNOUNCEMENT
        </span>
        {/* <span className="text-sm font-bold bg-white text-red-600 px-3 py-1 md:hidden lg:hidden xl:hidden rounded-sm">
          NEW ANNOUNCEMENT
        </span> */}
      </div>

      {/* Scrolling Content Container */}
      <div
        className="h-35 md:h-81 overflow-hidden relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`absolute w-full transition-all duration-300 ${isHovered ? '' : 'animate-scroll'}`}>
          {/* Duplicate content for seamless loop */}
          {[...announcements, ...announcements].map((announcement: Announcement, index: number) => (
            <div key={index} className={`px-4 py-3 border-slate-50 rounded-xl my-2 ${announcement.bgcolor}`}>
              <div className="flex  items-center">
                <span className="text-red-600 mr-2 mt-1 flex-shrink-0">📢</span>
                <div className="text-sm font-bold text-blue-950 leading-tight">
                  {announcement.title}
                </div>
              </div>
              {/* <div className="text-xs text-white mb-2 pl-6">
                {announcement.details}
              </div>
              <div className="text-xs font-bold text-white pl-6">
                {announcement.lastDate}
              </div> */}
              {/* <Link href={announcement.url} className="text-xs underline cursor-pointer text-red-500 hover:text-red-600 pl-6 mt-1">
                (Click to Join Now)
              </Link> */}
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBox;