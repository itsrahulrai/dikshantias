'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import AnnouncementRow from './AnnouncementRow';

export default function HeroSlider() {
    const courses = [
        { name: "E-Learning", color: "bg-purple-200", icon: "⏰" },
        { name: "What to Read in The Hindu", color: "bg-yellow-200", icon: "🎥" },
        { name: "What to  Read in The Indian Express", color: "bg-green-200", icon: "🏫" },
        { name: "Daily Current Affairs", color: "bg-pink-200", icon: "✍️" },
        { name: "Editorial Analysis", color: "bg-red-200", icon: "📚" },
        { name: "Important Facts of the Day ", color: "bg-blue-200", icon: "👥" },
    ];

    const slides = [
        { id: 1, title: 'Slide 1', image: '/img/hero-slider.webp' },
        { id: 2, title: 'Slide 2', image: '/img/hero-slider-2.webp' },
        { id: 3, title: 'Slide 3', image: '/img/hero-slider.webp' },
        { id: 4, title: 'Slide 4', image: '/img/hero-slider-2.webp' },
    ];

    const mobileheroslider = [
        { id: 1, title: 'Slide 1', image: '/img/mobile-hero-banner.webp' },
        { id: 2, title: 'Slide 2', image: '/img/mobile-hero-banner-2.webp' },
        { id: 3, title: 'Slide 3', image: '/img/mobile-hero-banner.webp' },
    ]

    return (
        <div className="bg-white -mt-14 md:mt-3 mx-2">
            {/* Top Slider */}
            <div className="max-w-7xl md:mx-auto mx-1 hidden lg:flex md:flex ">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 1 },
                    }}
                    className="md:rounded-xl rounded-lg"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="h-auto bg-white shadow-md md:rounded-lg overflow-hidden items-center justify-center">
                                <Image width={1920} height={500} src={slide.image} alt={slide.title} className="w-full h-full" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* tab and mobile hero */}
            <div className="max-w-7xl md:mx-auto mx-1 flex md:hidden lg:hidden">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 1 },
                    }}
                    className="md:rounded-xl rounded-lg"
                >
                    {mobileheroslider.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="h-auto bg-white shadow-md md:rounded-lg overflow-hidden items-center justify-center">
                                <Image width={1920} height={500} src={slide.image} alt={slide.title} className="w-full h-full" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>        

            {/* announcement */}

            <AnnouncementRow />

            {/* Popular Courses Card Slider with Autoplay */}
            <div className="container max-w-7xl mx-auto md:mt-0 mt-4 md:py-8">
                <h2 className="text-xl md:text-3xl font-bold mb-4 text-[#040c33] pl-2 md:pl-0">
                    Latest News and <span className="text-[#f43144]">Updates</span>
                </h2>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={8}
                    slidesPerView={2}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 6 },
                    }}
                >
                    {courses.map((course, index) => (
                        <SwiperSlide key={index}>
                            <div className={`md:w-48 w-44 md:h-32 h-26 ${course.color} rounded-lg flex flex-col text-center p-4`}>
                                <span className="text-3xl mb-2">{course.icon}</span>
                                <span className="text-[13px] md:text-[15px] font-bold text-[#040c33]">{course.name}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
        </div>
    );
}
