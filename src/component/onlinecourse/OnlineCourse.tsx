import React from 'react';
import { Star, Clock, Users, CheckCircle, Book } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CourseFeature {
    text: string;
    completed?: boolean;
}

interface Course {
    id: number;
    badge: {
        text: string;
        color: string;
    };
    originalPrice: string;
    currentPrice: string;
    rating: number;
    title: string;
    description: string;
    duration: string;
    book?: string;
    features?: CourseFeature[];
    moreFeatures?: number;
    image: string;
    url:string;
}

const courses: Course[] = [
    {
        id: 1,
        badge: { text: "Online", color: "bg-green-500" },
        originalPrice: "₹40,000",
        currentPrice: "₹35,000",
        rating: 4.9,
        title: "समाजशास्त्र (वैकल्पिक विषय) Foundation Course",
        description: "Complete preparation for UPSC Prelims Examination",
        duration: "8 Months /2 hrs.",
        book: "200 Lesson",
        image: "/img/Prelims-Foundation-Course.webp",
        url:'foundation-course'
    },
    {
        id: 2,
        badge: { text: "High Success Rate", color: "bg-blue-500" },
        originalPrice: "₹70,000",
        currentPrice: "₹58,000",
        rating: 4.8,
        title: "समाजशास्त्र (वैकल्पिक विषय) Foundation Course",
        description: "Comprehensive mains preparation with answer writing mastery",
        duration: "2 hrs./day",
        book: "200 Lesson",
        image: "/img/Prelims-Foundation-Course.webp",
        url:'foundation-course'
    },
    {
        id: 3,
        badge: { text: "Best Value", color: "bg-red-500" },
        originalPrice: "₹125,000",
        currentPrice: "₹89,000",
        rating: 4.9,
        title: "GS Foundation Course (Prelims+Mains)",
        description: "End-to-end preparation from Prelims to Interview",
        duration: "2 hrs./day",
        book: "250 Lesson",
       image: "/img/Prelims-Foundation-Course.webp",
        url:'foundation-course'
    },
    {
        id: 4,
        badge: { text: "Expert Faculty", color: "bg-purple-500" },
        originalPrice: "₹52,000",
        currentPrice: "₹38,000",
        rating: 4.7,
        title: "NCERT GS Foundation Course (Prelims+Mains)",
        description: "Specialized coaching for Sociology optional subject",
        duration: "2 hrs./day",
        book: "200 Lesson",
       image: "/img/Prelims-Foundation-Course.webp",
        url:'foundation-course'
    }
];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Card Header with Image and Badge */}
            <div className="relative h-38 md:h-32 bg-gradient-to-br from-gray-700 to-gray-900">
               <div className="absolute">
                       <Image 
                                   src={course.image} 
                                   width={900} 
                                   height={300} 
                                   alt={'Prilims'} 
                                   className="object-cover h-full w-full" 
                                 />
               </div>
                {/* Badge */}
                <div className={`absolute top-4 left-4 ${course.badge.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {course.badge.text}
                </div>

                {/* Price */}
                <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-1">
                    <div className="text-gray-400 text-sm line-through">{course.originalPrice}</div>
                    <div className="text-red-600 text-lg font-bold -mt-1.5 ">{course.currentPrice}</div>
                </div>

                {/* Rating */}
                <div className="absolute top-36 left-4 bg-yellow-100 rounded-full px-2 py-1 flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-sm font-medium text-gray-800">{course.rating}</span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 mt-6 md:mt-12">
                <h3 className="text-[18px] font-bold text-[#00072c] mb-2">{course.title}</h3>
                {/* <p className="text-gray-600 text-sm mb-4">{course.description}</p> */}

                {/* Duration and Students */}
                <div className="flex items-center justify-between mb-4 text-sm text-[#00072c]">
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-orange-500" />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                        <Book className="w-4 h-4 mr-1 text-orange-500"/>
                        <span>{course.book}</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3 text-center">
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                        Enroll Now
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <Link href={`/online-course/${course.url}`} className="w-full text-blue-800 hover:text-blue-950 font-medium py-2 transition-colors duration-200 ">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

const 


OnlineCourse: React.FC = () => {
    return (
        <>
            <div className='container max-w-7xl mx-auto my-4 -mt-14 md:mt-3 px-2 md:px-0'>
                <Image src="/img/online-course/online-course-hero.webp" width={1920} height={500} alt='About Us' className='rounded-xl' />
            </div>

            {/* end of hero */}
            <div className="bg-gray-50 py-8 px-4 mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 -mt-7 md:mt-1 lg:grid-cols-4 gap-6">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OnlineCourse;