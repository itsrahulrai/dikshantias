'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface FounderProfile {
    id: number;
    name: string;
    title: string;
    company: string;
    description: string;
    hasImage: boolean;
    image?: string;
    url: string;
}

const DirectorMessage: React.FC = () => {
    const founders: FounderProfile[] = [
        {
            id: 1,
            name: "Dr. S.S. Pandey",
            title: "Educator & Director, Dikshant IAS",
            company: "Dikshant IAS",
            description: "Dr. S. S. Pandey got his Ph.D. in 2000 on “Labour: Management Relations in India,” and after getting his Ph.D., he joined as a research assistant at Indira Gandhi Rashtriya Kala Kendra, New Delhi, with famous anthropologist Dr. B. N. Saraswati. In 2002, he joined as an assistant professor at Ram Manohar Lohia Awadh University, Faizabad, Uttar Pradesh (HNB PG College, Lalgang). He worked at the college for a year and then resigned from his job to teach UPSC aspirants.",
            hasImage: true,
            image: "/img/ss-pandey.jpg",
            url:"https://drsspandey.com/"
        },
        {
            id: 2,
            name: "Ashutosh Dixit",
            title: "Educator & CEO, Dikshant IAS",
            company: "Dikshant IAS",
            description: "From the boardrooms of global corporations to the classrooms of aspiring civil servants, Ashutosh Dixit has carved a unique path—where corporate excellence meets educational transformation. A visionary leader with a heart for public good, Ashutosh Dixit today stands as a mentor, strategist, and nation-builder, steering one of India’s most socially committed institutions—Dikshant Education Centre Private Limited.",
            hasImage: true,
            image: "/img/ashutosh-dixit.jpg",
            url:"/ashutosh-dixit"
        }
    ];

    return (
        <>
            <div className='bg-[#ecf4fc] py-18 px-2'>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {founders.map((founder) => (
                            <div
                                key={founder.id}
                                className="group bg-white rounded-xl shadow-md hover:shadow-xl p-2 Md:p-0 text-center md:text-left transition-all duration-300 transform hover:-translate-y-2 overflow-hidden "
                            >
                                <div className="flex flex-col md:flex-row h-full">
                                    {/* Image Section */}
                                    <div className="md:w-70 w-40 h-40 mx-auto rounded-full md:rounded-none md:h-auto bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-300">
                                        <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                                            <Image
                                                width={500}
                                                height={600}
                                                src={founder.image ?? '/default-image.jpg'} 
                                                alt={founder.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-1 py-4 px-2 md:p-6 ">
                                        <div className="h-full flex flex-col">
                                            {/* Header */}
                                            <div className="mb-4">
                                                <h2 className="text-[18px] md:text-xl font-bold text-[#040c33] mb-2 group-hover:text-[#000b41] transition-colors duration-300">
                                                    {founder.name}
                                                </h2>
                                                <p className="text-[#092370] font-medium text-sm mb-1 group-hover:text-red-600 transition-colors duration-300">
                                                    {founder.title}
                                                </p>
                                            </div>

                                            {/* Description */}
                                            <div className="flex-1">
                                                <p className="text-blue-950 text-md text-justify leading-relaxed mb-4 group-hover:text-blue-950 transition-colors duration-300">
                                                    {founder.description}
                                                </p>
                                            </div>

                                            {/* Read More Link */}
                                            <div className="mt-auto mx-auto md:mx-0">
                                                <Link href={founder.url} className="text-[#b10208] font-semibold text-sm hover:text-[#c52a2f] hover:underline transition-all duration-300 flex items-center group/btn">
                                                    Read More
                                                    <svg
                                                        className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            </div>
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

export default DirectorMessage;