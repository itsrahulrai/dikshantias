'use client'

import 'swiper/css';
import 'swiper/css/pagination';
import AnnouncementBox from './AnnouncementBox';


export default function AnnouncementRow() {

    return (
        <div className="bg-white mt-5 md:mt-7 md:mx-2">
            <div className="md:max-w-7xl md:mx-auto mx-1 flex md:space-x-5 justify-between items-center">
                <div className='content-area w-full hidden md:flex lg:flex'>
                    <div className='bg-blue-100 py-22 px-10 rounded-xl '>
                        <h2 className="text-xl md:text-3xl font-bold mb-4 text-[#040c33] pl-2 md:pl-0">
                            New <span className="text-[#f43144]">Announcement</span>
                        </h2>
                        <span className='font-bold italic text-blue-950'>We are delighted to share some exciting news with all our students, aspirants, and well-wishers! 🚀</span>
                        <p className='text-blue-950 mt-2'>At Dikshant IAS, we have always been committed to providing the finest guidance, structured learning, and personal mentorship to help UPSC aspirants achieve their dreams. To further strengthen this mission, we are proud to announce our new initiative that brings even more value to your preparation journey:</p>
                    </div>

                </div>
                <div className='announcement-area w-[100%] md:w-[60%]'>
                    <div className=''>
                        <AnnouncementBox />

                    </div>
                </div>
            </div>
        </div>
    );
}
