'use client'

import AboutHero from '@/component/aboutus/AboutHero'
import Image from 'next/image'
import React from 'react'

const Page: React.FC = () => {
    return (
        <>
            <AboutHero />

            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center px-2 md:px-0'>
                    <div>
                        <div className='content md:pr-4 md:pt-4 text-center md:text-start'>
                            <h2 className='text-xl md:text-3xl lg:text-3xl font-bold text-red-700 mb-4'>
                                Dikshant IAS A Premier Civil Services Exam Coaching Institute
                            </h2>
                            <p className='text-justify text-blue-950'>
                                Dikshant IAS stands as a premier coaching institute dedicated to guiding aspirants on their journey to success in the Civil Services Examination. With a team of highly experienced and dedicated educators, the institute offers comprehensive preparation for UPSC and State PSC exams. Known for its structured curriculum, personalized mentoring, and result-oriented approach, Dikshant IAS ensures that every student receives the right guidance and support to excel in one of the most competitive exams in India. The institute emphasizes conceptual clarity, current affairs integration, answer writing practice, and interview preparation. Regular test series, doubt-solving sessions, and performance assessments help students stay focused and on track. Whether you’re a beginner or a repeat aspirant, Dikshant IAS provides a nurturing and disciplined environment to bring out the best in every candidate.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className='video md:pl-4 mt-6 md:pt-4'>
                            <iframe
                                width="100%"
                                height="400px"
                                src="https://www.youtube.com/embed/gD-6ceWWRy4?si=yrHXkj4rgmg-y66O"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                className='rounded-2xl'
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            {/* vision section */}
            <div className='bg-[#ecf4fc] mt-20 py-10 md:py-18'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 items-center px-2 md:px-0'>
                        <div>
                            <div className='vision md:pr-4 pt-4'>
                                <Image
                                    src='/img/about-vision.webp'
                                    width={600}
                                    height={400}
                                    alt='about vision'
                                    className='border-6 border-white rounded-2xl'
                                />
                            </div>
                        </div>
                        <div>
                            <div className='content md:pl-4 pt-4 text-center md:text-start'>
                                <h3 className='text-xl md:text-3xl lg:text-3xl font-bold text-red-700 mb-4'>Our Vision</h3>
                                <span className='font-bold text-blue-950'>
                                    “You can’t cross the sea merely by standing and staring at the water.” – Tagore
                                </span>
                                <div className='space-y-4'>
                                    <p className='text-justify text-blue-950'>
                                        Our main objective is to guide the motivated young minds toward a fruitful professional life and a better career. As we strive for greatness, we are dedicated to each student’s success at our institute.
                                    </p>
                                    <p className='text-justify text-blue-950'>
                                        Because Dikshant IAS prepares you for all three stages of the recruiting process—the preliminary exam, the main exam, and the interview stage—joining us for a year, we can assure you of a bright future at an affordable fee.
                                    </p>
                                    <p className='text-justify text-blue-950'>
                                        You must comprehend that our objective is not just to prepare you for a test that will be very challenging, but also to help you find a rewarding profession. Our main objective is to guide the motivated young minds toward a fruitful professional life and a better career.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* mission section */}
            <div className='py-8 md:py-18'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 items-center text-center md:text-left px-2 md:px-0'>
                        <div>
                            <div className='content md:pr-4 pt-4'>
                                <h3 className='text-xl md:text-3xl lg:text-3xl font-bold text-red-700 mb-4'>Our Mission</h3>
                                <span className='font-bold text-blue-950'>From Intent To AIM, From Obtaining to Becoming</span>
                                <div className='space-y-4'>
                                    <p className='text-justify text-blue-950'>
                                        A candidate preparing for the Civil Services Examination does not have much time at its disposal, and the number of tasks that must be completed within this short period of time is truly extensive. The Civil Service Examination differs from university-style examinations in that the time and technique required to prepare for them are less straightforward.
                                    </p>
                                    <p className='text-justify text-blue-950'>
                                        It will be utterly absurd to believe that one may adequately prepare for this exam in a short amount of time on their own. Therefore, the preparation strategy must be tailored to the particular requirements of this exam. Knowing how difficult this issue is, Dikshant IAS promotes a strategy that is completely in line with the specifications of this test.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='vision md:pl-4 pt-4'>
                                <Image
                                    src='/img/about-mission.webp'
                                    width={600}
                                    height={400}
                                    alt='about mission'
                                    className='border-6 border-white rounded-2xl shadow-xl'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* thought section */}
            <div className='bg-[#ecf4fc] mt-8 mb-16 py-18'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 items-center px-2 md:px-0'>
                        <div>
                            <div className='vision md:pr-4 pt-4'>
                                <Image
                                    src='/img/about-thought.webp'
                                    width={600}
                                    height={400}
                                    alt='about thought'
                                    className='border-6 border-white rounded-2xl'
                                />
                            </div>
                        </div>
                        <div>
                            <div className='content md:pl-4 pt-4 text-center md:text-start'>
                                <h3 className='text-xl md:text-3xl lg:text-3xl font-bold text-red-700 mb-4'>Thoughts</h3>
                                <span className='font-bold text-blue-950'>
                                    From Ambition To Aspiration, From Acquiring To Becoming
                                </span>
                                <div className='space-y-4'>
                                    <p className='text-justify text-blue-950'>
                                        Our experienced faculties have designed the curriculum conscientiously to directly meet the demands of the examinations. We persistently keep changing our approach as per the changing trends in examinations and accordingly develop relevant content and infographics to effectively bring down the workload on the students immensely and allow them to rely on highly competent and tailor-made guidance, the success story of our students is a testimony to our excellence in this field.
                                    </p>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Page
