'use client'
import React, { useState } from 'react';
import { ChevronDown, Menu, X, Phone, Play} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SlidingButtons from './SlidingButtons';

// type HeaderProps = Record<string, never>;

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setOpenMobileDropdown(null);
    };

    const handleMobileDropdownToggle = (menu: string) => {
        setOpenMobileDropdown(openMobileDropdown === menu ? null : menu);
    };

    const handleMouseEnter = (menu: string) => {
        setOpenDropdown(menu);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    return (
        <div className="w-full">

            {/* Main Header */}
            <div className="bg-white shadow-sm md:py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-0">
                    <div className="flex items-center justify-between h-14 md:h-16">
                        {/* Logo */}
                        <div className="logo w-[130px] md:w-[160px]">
                             <Link href='/' className='logo'>
                                    <Image src={'/img/dikshant-logo.png'} alt="Logo" width={160} height={100} />
                            </Link>                   
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-4">
                            {/* Home */}
                            <div className="relative">
                                <button className="flex items-center space-x-1 text-gray-900 hover:text-red-500 font-medium py-2">
                                  <Link href='/about-us'>About Us</Link>
                                </button>
                            </div>

                             <a href="/scholarship-programme" className="text-gray-900 hover:text-red-500 font-medium py-2">Scholarship Programme</a>

                            {/* Courses Dropdown */}
                            <div
                                className="relative group"
                                onMouseEnter={() => handleMouseEnter('courses')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="flex items-center space-x-1 text-gray-900 hover:text-red-500 font-medium py-2">
                                    <span>Courses</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {openDropdown === 'courses' && (
                                    <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-md py-2 z-50">
                                        <Link href="/online-course" className="block px-4 py-2 text-gray-900 hover:text-red-500 hover:bg-gray-50">Online Mode</Link>
                                        <Link href="#" className="block px-4 py-2 text-gray-900 hover:text-red-500 hover:bg-gray-50">Offline Mode</Link>
                                    </div>
                                )}
                            </div>

                            {/* Pages Dropdown with Submenu */}
                            <div
                                className="relative group"
                                onMouseEnter={() => handleMouseEnter('pages')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="flex items-center space-x-1 text-gray-900 hover:text-red-500 font-medium py-2">
                                    <span>Current Affairs</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {openDropdown === 'pages' && (
                                    <div className="absolute top-full left-0 w-70 bg-white shadow-lg rounded-md py-2 z-50">
                                        <a href="/current-affairs/what-we-ready-in-hindu" className="block px-4 py-2 text-gray-900 hover:text-red-500 hover:bg-gray-50">What To Read In the Hindu</a>
                                        <a href="#" className="block px-4 py-2 text-gray-900 hover:text-red-500 hover:bg-gray-50">What To Read In The Indian Express</a>
                                        <a href="#" className="block px-4 py-2 text-gray-900 hover:text-red-500 hover:bg-gray-50">Editorial Analysis</a>
                                        <a href="#" className="block px-4 py-2 text-gray-900 hover:text-red-500 hover:bg-gray-50">Daily Current Affairs Analysis</a>
                                        <a href="#" className="block px-4 py-2 text-gray-900 hover:text-red-500 hover:bg-gray-50">Important Facts of the Day</a>

                                        <a href="#" className="block px-4 py-2 text-gray-900 hover:text-red-500 hover:bg-gray-50">FAQ</a>
                                    </div>
                                )}
                            </div>                          

                            {/* Blog Dropdown */}
                            <div
                                className="relative group"
                                onMouseEnter={() => handleMouseEnter('blog')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="flex items-center space-x-1 text-gray-900 hover:text-red-500 font-medium py-2">
                                    <Link href="/blogs">Blog</Link>
                                </button>

                            </div>
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-4">
                            {/* Phone Number (Hidden on mobile) */}
                            <div className="hidden md:flex items-center space-x-2 text-gray-900">
                                <div className='bg-red-100 p-3 rounded-full'>
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="text-sm">
                                    <div className="text-xs text-gray-500">Talk to our experts</div>
                                    <div className="font-medium">+91 7428092240</div>
                                </div>
                            </div>

                            {/* Live Demo Button with Blink Animation */}
                            {/* <button className="hidden sm:flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 animate-pulse">
                                <Play className="w-4 h-4" />
                                <span className="font-medium">Live Demo</span>
                            </button> */}

                            {/* Get Started Button */}
                            <button className="hidden sm:block bg-[#b10208] text-white px-6 py-2 rounded hover:bg-[#f43131] font-medium">
                                Get Started
                            </button>

                            {/* Login */}
                            <button className="hidden sm:flex items-center space-x-1 text-gray-700 hover:text-[#950409]">
                                <span>Log In</span>
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="lg:hidden p-2 text-gray-700 hover:text-[#f43144]"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Announcement Banner with Marquee */}
            {/* <div className="bg-rose-100 max-w-7xl mx-1 md:mx-auto py-2 px-3 overflow-hidden rounded-full md:rounded-lg my-2">
                <div className="flex items-center">
                    <div className="flex items-center space-x-2 md:px-4 flex-shrink-0 md:bg-red-500 rounded-full mr-4">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <Speech className="text-white w-4 h-5" />
                        </div>
                        <span className="font-bold text-sm mt-0.5 text-white hidden md:block">ANNOUNCEMENT</span>
                    </div>
                    <div className="max-w-5xl flex-1 overflow-hidden text-end">
                        <div className="animate-marquee whitespace-nowrap text-gray-900 text-md">
                            <p className='text-sm md:text-lg font-bold'> 🚧 We&apos;re Currently Improving Your Experience! Our site is undergoing maintenance to bring you a better and smoother experience. We appreciate your patience and understanding. Please check back soon! 🚧</p>
                        </div>
                    </div>
                </div>
            </div> */}

            <SlidingButtons />


            {/* Mobile Sidebar Menu */}
            <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                {/* Overlay */}
                <div
                    className="fixed inset-0 bg-black/65 transition-opacity duration-300"
                    onClick={toggleMobileMenu}
                ></div>

                {/* Sidebar */}
                <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-6 h-full overflow-y-auto">
                        {/* Close Button */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center space-x-2">
                                <Link href='/' className='logo'>
                                    <Image src={'/img/dikshant-logo.png'} alt="Logo" width={140} height={100} />
                                </Link>
                            </div>
                            <button onClick={toggleMobileMenu} className="p-2 text-gray-600 hover:text-gray-700">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="">
                            {/* Home */}
                            <div className="border-b border-gray-200">
                                <a href="/about-us" className="block py-1 text-gray-900 hover:text-red-500 font-medium">About Dikshant IAS</a>
                            </div>
                            <div className="border-b border-gray-200">
                                <a href="/about-upsc" className="block py-1 text-gray-900 hover:text-red-500 font-medium">About UPSC</a>
                            </div>

                            {/* Courses Dropdown */}
                            <div className="border-b border-gray-200">
                                <button
                                    className="flex items-center justify-between w-full text-left py-2 text-gray-900 hover:text-red-500 font-medium"
                                    onClick={() => handleMobileDropdownToggle('courses')}
                                >
                                    <span>Courses</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openMobileDropdown === 'courses' ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openMobileDropdown === 'courses' ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="ml-4 space-y-2 pt-2">
                                        <Link href="/online-course" className="block py-1 text-gray-700 hover:text-red-500">Online Mode</Link>
                                        <Link href="#" className="block border-b border-gray-200 py-1 text-gray-700 hover:text-red-500">Offline Mode</Link>

                                    </div>
                                </div>
                            </div>

                            {/* Pages Dropdown with Submenu */}
                            <div className="border-b border-gray-200">
                                <button
                                    className="flex items-center justify-between w-full text-left py-2 text-gray-900 hover:text-red-500 font-medium"
                                    onClick={() => handleMobileDropdownToggle('pages')}
                                >
                                    <span>Current Affair</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openMobileDropdown === 'pages' ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openMobileDropdown === 'pages' ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="ml-4 space-y-2 pt-2">
                                        <Link href="/current-affairs/what-we-ready-in-hindu" className="block text-sm px-4 py-2 text-gray-900 hover:text-red-500 hover:bg-gray-50">What To Read In the Hindu</Link>
                                        <Link href="#" className="block text-sm px-4 py-2 text-gray-900 hover:text-red-500 hover:bg-gray-50">What To Read In The Indian Express</Link>
                                        <Link href="#" className="block text-sm px-4 py-2 text-gray-900 hover:text-red-500 hover:bg-gray-50">Editorial Analysis</Link>
                                        <Link href="#" className="block text-sm px-4 py-2 text-gray-900 hover:text-red-500 hover:bg-gray-50">Daily Current Affairs Analysis</Link>
                                        <Link href="#" className="block text-sm px-4 py-2 text-gray-900 hover:text-red-500 hover:bg-gray-50">Important Facts of the Day</Link>


                                        {/* Shop Submenu */}
                                        {/* <div>
                                            <button
                                                className="flex items-center justify-between w-full text-left py-2 text-gray-600 hover:text-red-500"
                                                onClick={() => handleMobileDropdownToggle('shop')}
                                            >
                                                <span>Shop</span>
                                                <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${openMobileDropdown === 'shop' ? 'rotate-90' : ''}`} />
                                            </button>
                                            <div className={`overflow-hidden transition-all duration-300 ${openMobileDropdown === 'shop' ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <div className="ml-4 space-y-2 pt-1">
                                                    <a href="#" className="block py-1 text-gray-500 hover:text-red-500 text-sm">Shop Grid</a>
                                                    <a href="#" className="block py-1 text-gray-500 hover:text-red-500 text-sm">Shop List</a>
                                                    <a href="#" className="block py-1 text-gray-500 hover:text-red-500 text-sm">Product Details</a>
                                                </div>
                                            </div>
                                        </div> */}

                                        <a href="#" className="block py-2 text-gray-600 hover:text-red-500">FAQ</a>
                                    </div>
                                </div>
                            </div>

                            {/* Events */}
                            <div className="border-b border-gray-200">
                                <a href="/scholarship-programme" className="block py-2 text-gray-900 hover:text-red-500 font-medium">Scholarship Programme</a>
                            </div>
                            <div className="border-b border-gray-200">
                                <Link href="/blogs" className="block py-2 text-gray-900 hover:text-red-500 font-medium">Blog</Link>
                            </div>

                        </nav>

                        {/* Mobile Actions */}
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center space-x-2 text-gray-600 p-3 bg-gray-50 rounded">
                                <div className='bg-red-500 rounded-full p-3'>
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-sm">
                                    <div className="text-xs text-gray-500">Talk to our experts</div>
                                    <div className="font-bold text-gray-900 text-lg">+91 7428092240</div>
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white py-3 rounded hover:bg-red-600 animate-pulse">
                                <Play className="w-4 h-4" />
                                <span className="font-medium">Live Demo</span>
                            </button>

                            <button className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 font-medium">
                                Get Started
                            </button>

                            <button className="w-full text-gray-700 hover:text-red-500 py-3 border border-gray-300 rounded">
                                Log In
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <style jsx>{`
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
      `}</style> */}
        </div>
    );
};

export default Header;