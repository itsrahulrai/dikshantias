'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Phone, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SlidingButtons from './SlidingButtons';

interface CurrentAffair {
    _id: string;
    title: string;
    slug: string;
    active: boolean;
}

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
    const [currentAffairs, setCurrentAffairs] = useState<CurrentAffair[]>([]);

    // Fetch Current Affairs from API
    useEffect(() => {
        const fetchCurrentAffairs = async () => {
            try {
                const res = await fetch('/api/admin/current-affairs');
                const data = await res.json();
                setCurrentAffairs(data.filter((item: CurrentAffair) => item.active));
            } catch (error) {
                console.error('Error fetching current affairs:', error);
            }
        };
        fetchCurrentAffairs();
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setOpenMobileDropdown(null);
    };

    const handleMobileDropdownToggle = (menu: string) => {
        setOpenMobileDropdown(openMobileDropdown === menu ? null : menu);
    };

    const handleMouseEnter = (menu: string) => setOpenDropdown(menu);
    const handleMouseLeave = () => setOpenDropdown(null);

    return (
        <div className="w-full">
            {/* Main Header */}
            <div className="bg-white shadow-sm md:py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-0">
                    <div className="flex items-center justify-between h-14 md:h-16">
                        {/* Logo */}
                        <div className="logo w-[130px] md:w-[160px]">
                            <Link href='/'>
                                <Image src={'/img/dikshant-logo.png'} alt="Logo" width={160} height={100} />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-4">
                            <Link href='/about-us' className="text-gray-900 hover:text-red-500 font-medium py-2">About Us</Link>
                            <Link href='/scholarship-programme' className="text-gray-900 hover:text-red-500 font-medium py-2">Scholarship Programme</Link>

                            {/* Current Affairs Dropdown */}
                            <div
                                className="relative group"
                                onMouseEnter={() => handleMouseEnter('currentAffairs')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="flex items-center space-x-1 text-gray-900 hover:text-red-500 font-medium py-2">
                                    <span>Current Affairs</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {openDropdown === 'currentAffairs' && (
                                    <div className="absolute top-full left-0 w-72 bg-white shadow-lg rounded-md py-2 z-50">
                                        {currentAffairs.map(item => (
                                            <Link
                                                key={item._id}
                                                href={`/current-affairs/${item.slug}`}
                                                className="block px-4 py-2 text-gray-900 hover:text-red-500 hover:bg-gray-50"
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link href="/blogs" className="text-gray-900 hover:text-red-500 font-medium py-2">Blog</Link>
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-2 text-gray-900">
                                <div className='bg-red-100 p-3 rounded-full'>
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="text-sm">
                                    <div className="text-xs text-gray-500">Talk to our experts</div>
                                    <div className="font-medium">+91 7428092240</div>
                                </div>
                            </div>

                            <button className="hidden sm:block bg-[#b10208] text-white px-6 py-2 rounded hover:bg-[#f43131] font-medium">Get Started</button>
                            <button className="hidden sm:flex items-center space-x-1 text-gray-700 hover:text-[#950409]">Log In</button>
                            <button onClick={toggleMobileMenu} className="lg:hidden p-2 text-gray-700 hover:text-[#f43144]">
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sliding Buttons Component */}
            <SlidingButtons />

            {/* Mobile Sidebar Menu */}
            <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="fixed inset-0 bg-black/65 transition-opacity duration-300" onClick={toggleMobileMenu}></div>
                <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-6 h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-8">
                            <Link href='/' className='logo'>
                                <Image src={'/img/dikshant-logo.png'} alt="Logo" width={140} height={100} />
                            </Link>
                            <button onClick={toggleMobileMenu} className="p-2 text-gray-600 hover:text-gray-700"><X className="w-6 h-6" /></button>
                        </div>

                        {/* Mobile Navigation */}
                        <nav>
                            <Link href='/about-us' className="block py-2 text-gray-900 hover:text-red-500 font-medium border-b border-gray-200">About Dikshant IAS</Link>
                            <Link href='/scholarship-programme' className="block py-2 text-gray-900 hover:text-red-500 font-medium border-b border-gray-200">Scholarship Programme</Link>

                            {/* Current Affairs Mobile Dropdown */}
                            <div className="border-b border-gray-200">
                                <button
                                    className="flex items-center justify-between w-full text-left py-2 text-gray-900 hover:text-red-500 font-medium"
                                    onClick={() => handleMobileDropdownToggle('currentAffairs')}
                                >
                                    <span>Current Affairs</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openMobileDropdown === 'currentAffairs' ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openMobileDropdown === 'currentAffairs' ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="ml-4 space-y-2 pt-2">
                                        {currentAffairs.map(item => (
                                            <Link
                                                key={item._id}
                                                href={`/current-affairs/${item.slug}`}
                                                className="block py-1 text-gray-700 hover:text-red-500"
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Link href="/blogs" className="block py-2 text-gray-900 hover:text-red-500 font-medium border-b border-gray-200">Blog</Link>
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
                            <button className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 font-medium">Get Started</button>
                            <button className="w-full text-gray-700 hover:text-red-500 py-3 border border-gray-300 rounded">Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
