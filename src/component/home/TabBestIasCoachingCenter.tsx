'use client'
import { useState } from 'react';
import { Award, Users, BookOpen, MessageSquare, Star } from 'lucide-react';

interface TabData {
    id: string;
    title: string;
    color: string;
    hoverColor: string;
    cardTitle: string;
    description: string;
    icon: React.ReactNode;
}

const tabsData: TabData[] = [
    {
        id: 'journey',
        title: '20+ Years Journey of Excellence',
        color: 'bg-red-400',
        hoverColor: 'hover:bg-red-500',
        cardTitle: '20+ Years Journey of Excellence',
        description: 'We are India\'s well-known Institute and the Best IAS Coaching in India preparing candidates for the Civil Services Examination at all three levels- Prelims, Mains & personality test.',
        icon: <Award className="w-16 h-16 text-[#d3b054]" />
    },
    {
        id: 'faculty',
        title: 'Experienced Faculty Members',
        color: 'bg-blue-400',
        hoverColor: 'hover:bg-blue-500',
        cardTitle: 'Experienced Faculty Members',
        description: 'Our IAS Coaching Center in Delhi is equipped with the team of top most faculties for preparation of UPSC (Prelims+Mains) who are known for producing best results year after year.',
        icon: <Users className="w-16 h-16 text-[#d3b054]" />
    },
    {
        id: 'materials',
        title: 'Best Study Materials',
        color: 'bg-green-400',
        hoverColor: 'hover:bg-green-500',
        cardTitle: 'Best Study Materials',
        description: 'Our students always receive well curated study resources, which helps them stay on task and saves them time.',
        icon: <BookOpen className="w-16 h-16 text-[#d3b054]" />
    },
    {
        id: 'interview',
        title: 'Best Mock Interview Programme',
        color: 'bg-orange-400',
        hoverColor: 'hover:bg-orange-500',
        cardTitle: 'Best Mock Interview Programme',
        description: 'Dikshant IAS, a pioneer in the industry, offers the Best Mock Interview Program in India and boasts the most knowledgeable IAS interview panel in the nation, which comprises Prof. D. P. Agarwal, former board members, top bureaucrats, and academicians.',
        icon: <MessageSquare className="w-16 h-16 text-[#d3b054]" />
    },
    {
        id: 'seminar',
        title: 'Seminar and Topper Class',
        color: 'bg-pink-400',
        hoverColor: 'hover:bg-pink-500',
        cardTitle: 'Seminar and Topper Class',
        description: 'We organize seminars and topper classes to teach students how to prepare for the UPSC; where seasoned UPSC professionals assist students for their doubts.',
        icon: <Star className="w-16 h-16 text-[#d3b054]" />
    }
];

export default function TabBestIasCoachingCenter() {
    const [activeTab, setActiveTab] = useState<string>('journey');

    const activeTabData = tabsData.find(tab => tab.id === activeTab) || tabsData[0];

    return (
        <>
            <div className='bg-[#00072c] py-15 mb-10'>
                <div className="w-full max-w-7xl mx-auto p-4">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Vertical Tabs - Left Side */}
                        <div className="lg:w-1/2 space-y-3">
                            {tabsData.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                w-full md:h-auto md:w-130 text-left px-6 py-4 rounded-full text-white font-medium md:text-xl
                transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl
                ${tab.color} ${tab.hoverColor}              
              `}>
                                    {tab.title}
                                </button>
                            ))}
                        </div>

                        {/* Content Card - Right Side */}
                        <div className="lg:w-1/2">
                            <div className="bg-white/6 border border-gray-100/20  rounded-2xl shadow-xl p-6 md:p-8 h-full flex flex-col justify-between min-h-[300px]">
                                {/* Card Header */}
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                                    <div className="flex-1 mb-4 md:mb-0 md:pr-6">
                                        <div className="w-80 bg-red-500 text-white px-4 py-2 rounded-full text-center md:text-left text-md font-bold mb-4">
                                            {activeTabData.cardTitle}
                                        </div>
                                        <p className="text-white leading-relaxed text-md text-center md:text-left md:text-base">
                                            {activeTabData.description}
                                        </p>
                                    </div>

                                    {/* Icon/Image Section */}
                                    <div className="flex-shrink-0 mx-auto">
                                        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
                                            {activeTab === 'journey' ? (
                                                <div className="text-center">
                                                    <div className="text-2xl md:text-3xl font-bold text-[#d3b054]">20</div>
                                                    <div className="text-xs text-[#d3b054] opacity-90">YEARS</div>
                                                    <div className="flex justify-center mt-1">
                                                        {[...Array(3)].map((_, i) => (
                                                            <Star key={i} className="w-3 h-3 text-[#d3b054] fill-current" />
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                activeTabData.icon
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Achievement Badge */}
                                {activeTab === 'journey' && (
                                    <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-l-4 border-yellow-500">
                                        <div className="flex items-center">
                                            <Award className="w-6 h-6 text-yellow-600 mr-2" />
                                            <span className="text-sm font-medium text-gray-800">
                                                Trusted by thousands of successful candidates
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}