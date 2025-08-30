'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Card {
  _id: string;
  title: string;
  slug: string;
  date: string;
  month: string;
  year: string;
  bgColor?: string;
  dateColor?: string;
}

const ReadInHindu: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch('/api/admin/current-affairs');
        if (!res.ok) throw new Error('Failed to fetch current affairs');
        const data = await res.json();

        // Map data to Card format
        const formattedCards: Card[] = data.map((item, index: number) => ({
          _id: item._id,
          title: item.title,
          slug: item.slug,
          date: new Date(item.createdAt).getDate().toString(),
          month: new Date(item.createdAt).toLocaleString('default', { month: 'short' }),
          year: new Date(item.createdAt).getFullYear().toString(),
          bgColor: index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100', // example colors
          dateColor: index % 2 === 0 ? 'bg-blue-200' : 'bg-gray-200',
        }));

        setCards(formattedCards);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (cards.length === 0) return <p className="text-center py-10">No data found.</p>;

  return (
    <>
      <div className='container max-w-7xl mx-auto -mt-14 md:mt-3 my-4 px-2 md:px-0'>
        <Image src="/img/current-affairs-banner.webp" width={1920} height={500} alt='Current Affairs Banner' className='rounded-xl' />
      </div>

      <div className="bg-white p-4 md:p-6 lg:p-8 mb-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {cards.map((card, index) => (
              <div key={card._id} className={`${card.bgColor} rounded-lg border border-gray-200 overflow-hidden`}>
                <div className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    {/* Date Section */}
                    <div className={`${card.dateColor} rounded-md px-3 py-2 flex-shrink-0 text-center min-w-[60px]`}>
                      <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">{card.month}</div>
                      <div className="text-2xl md:text-3xl font-bold text-[#00072c] leading-none">{card.date}</div>
                      <div className="text-xs text-gray-600 mt-1">{card.year}</div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-base font-semibold text-[#00072c] leading-tight mb-3 line-clamp-2">{card.title}</h3>
                      <Link
                        href={`/current-affairs/${card.slug}`}
                        className="text-red-600 hover:text-red-700 text-xs md:text-sm font-medium uppercase tracking-wide transition-colors duration-200 flex items-center gap-1"
                      >
                        VIEW DETAILS
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadInHindu;
