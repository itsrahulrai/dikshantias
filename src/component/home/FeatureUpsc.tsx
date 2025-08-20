'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface Program {
  id: number;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  originalPrice: number;
  currentPrice: number;
  rating: number;
  duration: string;
  students: string;
  features: string[];
  moreFeatures: number;
  image: string;
  backcolor: string;
}

interface ProgramCardProps {
  program: Program;
}

const FeatureUpsc: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slidesToShow, setSlidesToShow] = useState<number>(1);
  const sliderRef = useRef<HTMLDivElement>(null);

  const programs: Program[] = [
    {
      id: 1,
      badge: 'Most Popular',
      badgeColor: 'bg-green-500',
      title: 'Prelims Foundation',
      description: 'Complete preparation for UPSC Preliminary Examination',
      originalPrice: 65000,
      currentPrice: 48000,
      rating: 4.9,
      duration: '12 Months',
      students: '3,500+',
      features: ['Complete NCERT Foundation', 'Daily Current Affairs', '25+ Mock Tests'],
      moreFeatures: 2,
      image: '/img/Prelims-Foundation-Course.webp',
      backcolor: 'purple-200',
    },
    {
      id: 2,
      badge: 'High Success Rate',
      badgeColor: 'bg-blue-500',
      title: 'Mains Intensive Course',
      description: 'Comprehensive mains preparation with answer writing mastery',
      originalPrice: 70000,
      currentPrice: 58000,
      rating: 4.8,
      duration: '10 Months',
      students: '2,200+',
      features: ['Essay Writing Masterclass', 'GS Paper-wise Coverage', 'Weekly Answer Tests'],
      moreFeatures: 2,
      image: '/img/Mains-Intensive-Course.webp',
      backcolor: 'purple-200',
    },
    {
      id: 3,
      badge: 'Best Value',
      badgeColor: 'bg-red-600',
      title: 'Complete UPSC Course',
      description: 'End-to-end preparation from Prelims to Interview',
      originalPrice: 125000,
      currentPrice: 89000,
      rating: 4.9,
      duration: '18 Months',
      students: '4,100+',
      features: ['Prelims + Mains + Interview', 'Optional Subject Coaching', 'Unlimited Mock Tests'],
      moreFeatures: 2,
      image: '/img/Complete-UPSC-Course.webp',
      backcolor: 'purple-200',
    },
    {
      id: 4,
      badge: 'Expert Faculty',
      badgeColor: 'bg-purple-500',
      title: 'Sociology Optional',
      description: 'Specialized coaching for Sociology optional subject',
      originalPrice: 52000,
      currentPrice: 38000,
      rating: 4.7,
      duration: '8 Months',
      students: '1,800+',
      features: ['Subject Expert Faculty', 'Previous Year Analysis', 'Weekly Tests'],
      moreFeatures: 2,
      image: '/img/Sociology-Optional.webp',
      backcolor: 'purple-200',
    },
    {
      id: 5,
      badge: 'New Launch',
      badgeColor: 'bg-orange-500',
      title: 'Essay Writing Masterclass',
      description: 'Focused training on essay writing techniques',
      originalPrice: 35000,
      currentPrice: 25000,
      rating: 4.6,
      duration: '6 Months',
      students: '1,200+',
      features: ['Expert Essay Review', 'Weekly Practice Tests', 'Personalized Feedback'],
      moreFeatures: 2,
      image: '/img/Essay-Writing-Masterclass.webp',
      backcolor: 'purple-200',
    },
    {
      id: 6,
      badge: 'Limited Seats',
      badgeColor: 'bg-indigo-500',
      title: 'Interview Guidance',
      description: 'Comprehensive interview preparation with mock sessions',
      originalPrice: 45000,
      currentPrice: 32000,
      rating: 4.8,
      duration: '4 Months',
      students: '800+',
      features: ['Mock Interview Sessions', 'Personality Development', 'Current Affairs Focus'],
      moreFeatures: 2,
      image: '/img/Interview-Guidance-Program.webp',
      backcolor: 'purple-200',
    },
  ];

  // Update slide count based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setSlidesToShow(4);
      else if (width >= 768) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSlides = Math.max(0, programs.length - slidesToShow);

  // Update current slide if out of bounds
  useEffect(() => {
    if (currentSlide > maxSlides) {
      setCurrentSlide(maxSlides);
    }
  }, [slidesToShow, programs.length, currentSlide, maxSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= maxSlides ? 0 : prev + 1));
  }, [maxSlides]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlides : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.min(index, maxSlides));
  };

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="bg-white md:px-4 px-2 mb-6 md:mb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-[#040c33] mb-3 md:mb-5 text-start">
            Featured UPSC <span className="text-[#f43144]">Coaching Programs</span>
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div ref={sliderRef} className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${(currentSlide * 100) / slidesToShow}%)`,
              }}
            >
              {programs.map((program) => (
                <div
                  key={program.id}
                  className="flex-shrink-0 md:px-3 px-0"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <ProgramCard program={program} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {programs.length > slidesToShow && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 md:p-3 z-10 hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 md:p-3 z-10 hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {programs.length > slidesToShow && (
            <div className="flex justify-center mt-6 md:mt-8 gap-2">
              {Array.from({ length: maxSlides + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-7 h-2 md:w-7 md:h-3 rounded-full ${currentSlide === index ? 'bg-[#f43144]' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Program Card Component
const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow bg-white h-full relative">
      {/* Badge */}
      <div className={`absolute top-4 left-4 ${program.badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium z-10`}>
        {program.badge}
      </div>

      {/* Price */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow p-2 z-10 text-sm">
        <div className="text-blue-400 line-through text-xs">₹{program.originalPrice.toLocaleString()}</div>
        <div className="text-[#f43144] font-bold">₹{program.currentPrice.toLocaleString()}</div>
      </div>

      {/* Image */}
      <div className="h-48 relative">
        <Image src={program.image} alt={program.title} layout="fill" objectFit="cover" className="rounded-t-2xl" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-auto">
        <h3 className="text-lg font-bold text-[#040c33]">{program.title}</h3>
        <p className="text-blue-950 text-sm mt-1 mb-3 line-clamp-2">{program.description}</p>

        <div className="flex justify-between text-[#ee6b36] text-sm mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {program.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {program.students}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {program.features.slice(0, 2).map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-blue-950">
              <CheckCircle className="w-4 h-4 text-green-500" />
              {feature}
            </div>
          ))}
          {program.features.length > 2 && (
            <div className="text-[#f43144] text-sm font-medium">
              +{program.features.length - 2 + program.moreFeatures} more features
            </div>
          )}
        </div>

        {/* Buttons */}

        <div className="mt-auto flex gap-2.5 items-center">
          <button className="bg-blue-950 hover:bg-[#d12a3a] text-white py-2 px-5 rounded-lg text-sm font-semibold flex items-center justify-center gap-1">View Details</button>
          <button className="bg-[#f43144] hover:bg-blue-950 text-white py-2 px-5 rounded-lg text-sm font-semibold flex items-center justify-center gap-1">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureUpsc;
