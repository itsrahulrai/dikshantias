"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import AnnouncementRow from "./AnnouncementRow";
import HomeSlider from "./HomeSlider";

export default function HeroSlider() {
  const courses = [
    { id: "c1", name: "E-Learning", color: "bg-purple-200", icon: "⏰" },
    { id: "c2", name: "What to Read in The Hindu", color: "bg-yellow-200", icon: "🎥" },
    { id: "c3", name: "What to Read in The Indian Express", color: "bg-green-200", icon: "🏫" },
    { id: "c4", name: "Daily Current Affairs", color: "bg-pink-200", icon: "✍️" },
    { id: "c5", name: "Editorial Analysis", color: "bg-red-200", icon: "📚" },
    { id: "c6", name: "Important Facts of the Day", color: "bg-blue-200", icon: "👥" },
  ];

  return (
    <div className="bg-white -mt-14 md:mt-3 mx-2">
      {/* Top Slider (Desktop) */}
      <div className="max-w-7xl md:mx-auto mx-1 hidden md:flex">
        <HomeSlider sliderType="Desktop" />
      </div>

      {/* Mobile Slider */}
      <div className="max-w-7xl md:mx-auto mx-1 flex md:hidden">
        <HomeSlider sliderType="Mobile" />
      </div>

      {/* Announcement */}
      <AnnouncementRow />

      {/* Popular Courses Card Slider */}
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
          {courses.map((course) => (
            <SwiperSlide key={course.id}>
              <div
                className={`md:w-48 w-44 md:h-32 h-26 ${course.color} rounded-lg flex flex-col text-center p-4`}
              >
                <span className="text-3xl mb-2">{course.icon}</span>
                <span className="text-[13px] md:text-[15px] font-bold text-[#040c33]">
                  {course.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
