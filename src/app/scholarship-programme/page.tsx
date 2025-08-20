'use client'
import ScholershipFaq from '@/component/ScholershipFaq'
import Image from 'next/image'
import React from 'react'

const Page: React.FC = () => {
    return (
        <>
            <div className='container max-w-7xl mx-auto my-4 px-2 -mt-14 md:mt-3 md:px-0'>
                <Image src="/img/scholarship-hero.webp" width={1920} height={500} alt='About Us' className='rounded-xl' />
            </div>

            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center px-2 md:px-0'>
                    <div>
                        <div className='content md:pr-4 md:pt-4 text-center md:text-start'>
                            <h2 className='text-xl md:text-3xl lg:text-3xl font-bold text-red-700 mb-4'>
                                Dikshant Scholarship Program
                            </h2>
                            <p className='text-justify text-blue-950'>At Dikshant IAS, we believe that quality education and UPSC preparation should be accessible to all, regardless of economic or social background. To support deserving and hardworking aspirants, we proudly offer need-based and category-based scholarships.</p>
                            <p className='text-justify text-blue-950'>Dikshant Scholarship Program, is a welfare program run by Dikshant IAS under which free coaching is provided to socially and economically weaker students living in India. This program is funded by the Government of India and various other NGOs.</p>

                            <h3 className='font-bold mt-4 text-[#040c33]'>Funded by the Government of India and NGOs.</h3>

                            <p className='text-justify text-blue-950'>To avail the benefits of the scholarship program, click on the button below and get yourself registered.</p>

                        </div>
                    </div>
                    <div>
                        <div className='image md:pl-4 mt-6 md:pt-4'>
                            <Image src="/img/scholarship-program.jpg" width={1920} height={500} alt='Scholership Hero' className='rounded-xl' />
                        </div>
                    </div>
                </div>
            </div>

            {/* vision section */}
            <div className='bg-[#ecf4fc] mt-20 py-10 md:py-10'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 items-center px-14 md:px-0'>
                        <div>
                            <div className='content text-center md:text-start md:pr-4 pt-4'>
                                <h3 className='text-xl md:text-3xl lg:text-3xl font-bold text-red-700 mb-4'>Important Notes</h3>
                                <ul className='space-y-2 list-disc text-start text-blue-950'>
                                    <li>Students must present valid and up-to-date documents to claim scholarship benefits.</li>
                                    <li>The final approval of scholarship rests with the Dikshant IAS Scholarship Committee.</li>
                                    <li>Limited seats available under each category. Scholarships are granted on a first-come, first-served basis.</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className='content md:pl-4 pt-4 text-center md:text-start'>
                                <h3 className='text-xl md:text-3xl lg:text-3xl font-bold text-red-700 mb-4'> How to Apply?</h3>
                                <ul className='space-y-2 list-disc text-start text-blue-950'>
                                    <li>Fill the scholarship section in the scholarship form.</li>
                                    <li>Wait for call from our calling team.</li>
                                    <li>You can also reach on our helpline number - +91-9354994539</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* mission section */}
            <div className='py-8 md:py-18'>
                <div className='max-w-7xl mx-auto'>
                    <div className='items-center text-center md:text-left px-2 md:px-0'>
                        <div>
                            <div className='content md:pr-4'>
                                <h3 className='text-2xl md:text-3xl lg:text-3xl font-bold text-[#040c33] mb-4'>Empower your UPSC journey with Dikshant IAS – Where talent meets opportunity.</h3>
        
                                 <ScholershipFaq />

                            </div>
                        </div>
     
                    </div>
                </div>
            </div >

        </>
    )
}

export default Page
