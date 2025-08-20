import React, { JSX, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Globe, Globe2 } from 'lucide-react';

interface ButtonData {
  id: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  text: string;
  bgColor: string;
  textColor: string;
  iconBg: string;
}

interface SlidingButtonsProps {
  className?: string;
}

export default function SlidingButtons({ className = "" }: SlidingButtonsProps): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const buttons: ButtonData[] = [
    {
      id: 2,
      icon: Globe,
      text: "हिंदी वेबसाइट पर जाए",
      bgColor: "bg-yellow-200",
      textColor: "text-yellow-900",
      iconBg: "bg-yellow-400"
    },
    {
      id: 3,
      icon: Globe2,
      text: "VISIT OUR ENGLISH WEBSITE",
      bgColor: "bg-green-200",
      textColor: "text-green-900",
      iconBg: "bg-green-600"
    },
    {
      id: 1,
      icon: Download,
      text: "DOWNLOAD DIKSHANT LEARNING APP",
      bgColor: "bg-purple-200",
      textColor: "text-purple-900",
      iconBg: "bg-purple-400"
    }
  ];

  const nextSlide = (): void => {
    setCurrentSlide((prev: number) => (prev + 1) % buttons.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev: number) => (prev - 1 + buttons.length) % buttons.length);
  };

  const handleButtonClick = (buttonId: number): void => {
    console.log(`Button ${buttonId} clicked`);
  };

  // Auto-slide effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % buttons.length);
    }, 4000); // 4 seconds

    return () => clearInterval(intervalId);
  }, [buttons.length]);

  return (
    <div className={`w-full max-w-7xl mx-auto pt-2 md:pt-3 ${className}`}>
      {/* Desktop View - All buttons visible */}
      <div className="hidden md:flex md:justify-between items-center gap-6">
        {buttons.map((button: ButtonData) => {
          const IconComponent = button.icon;
          return (
            <button
              key={button.id}
              onClick={() => handleButtonClick(button.id)}
              className={`${button.bgColor} ${button.textColor} px-6 py-2 w-full rounded-full flex items-center gap-3 font-semibold text-[10px] md:text-sm hover:scale-101 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2`}
              type="button"
              aria-label={button.text}
            >
              <div className={`${button.iconBg} p-2 rounded-full`}>
                <IconComponent size={18} className="text-white" />
              </div>
              {button.text}
            </button>
          );
        })}
      </div>

      {/* Mobile View - Sliding carousel */}
      <div className="md:hidden">
        <div className="relative overflow-hidden pb-10" role="region" aria-label="Button carousel">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {buttons.map((button: ButtonData) => {
              const IconComponent = button.icon;
              return (
                <div key={button.id} className="w-full flex-shrink-0 px-4">
                  <button
                    onClick={() => handleButtonClick(button.id)}
                    className={`${button.bgColor} ${button.textColor} w-full px-6 py-1 rounded-full flex items-center justify-center gap-3 font-semibold text-[13px] `}
                    type="button"
                    aria-label={button.text}
                  >
                    <div className={`${button.iconBg} p-2 rounded-full flex-shrink-0`}>
                      <IconComponent size={18} className="text-white" />
                    </div>
                    <span className="text-center">{button.text}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Layout with arrows on sides */}
        <div className="relative flex items-center justify-center mt-6">
          {/* Previous Arrow - Left Side */}
          <button
            onClick={prevSlide}
            className="absolute bottom-[70px] left-4 p-1.5 rounded-full disabled:cursor-not-allowed focus:outline-none focus:ring-1"
            disabled={currentSlide === 0}
            type="button"
            aria-label="Previous slide"
          >
            <ChevronLeft 
              size={16} 
              className={currentSlide === 0 ? 'text-gray-400' : 'text-gray-700'}
            />
          </button>

          {/* Next Arrow - Right Side */}
          <button
            onClick={nextSlide}
            className="absolute bottom-[70px] right-4 p-1.5 rounded-full disabled:cursor-not-allowed focus:outline-none focus:ring-1"
            disabled={currentSlide === buttons.length - 1}
            type="button"
            aria-label="Next slide"
          >
            <ChevronRight 
              size={16} 
              className={currentSlide === buttons.length - 1 ? 'text-gray-400' : 'text-gray-700'}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
