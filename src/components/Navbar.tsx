"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Bars3Icon, 
  XMarkIcon, 
  BriefcaseIcon,
  UserCircleIcon 
} from "@heroicons/react/24/outline";
import { useStore } from "@/store/useStore";
import ProfileAvatar from "./ProfileAvatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const { currentUser, userPersona } = useStore();

  // Check window width on mount and resize
  useEffect(() => {
    const handleResize = () => {
      // Show burger menu when width is less than 1024px (lg breakpoint)
      setIsMobileView(window.innerWidth < 1024);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Get navigation links based on user persona
  const getNavLinks = () => {
    // Default links (not logged in)
    const defaultLinks = [
      { href: "/find-jobs", label: "Find Jobs" },
      { href: "/job-board", label: "Job Board" },
      { href: "/training-center", label: "Training Center" },
      { href: "/consul", label: "Get Mentoring" },
      { href: "/post-job", label: "Post a Job" },
      { href: "/matches", label: "Find KerjaMates" },
      { href: "/wallet", label: "Wallet" },
      { href: "/settings", label: "Settings" },
    ];

    // If no user or persona, return default links
    if (!currentUser || !userPersona) {
      return defaultLinks;
    }

    const links = [];

    // Daily work (Kerja Harian)
    if (userPersona.kerjaHarian) {
      links.push({ href: "/dashboard", label: "Dashboard" });
      links.push({ href: "/categories", label: "Find Jobs" });
    }

    // Formal job (Kerja Formal)
    if (userPersona.kerjaFormal) {
      links.push({ href: "/job-board", label: "Job Board" });
    }

    // Training
    if (userPersona.training) {
      links.push({ href: "/training-center", label: "Training Center" });
      links.push({ href: "/consul", label: "Get Mentoring" });
    }

    // Need help (looking to hire)
    if (userPersona.needHelp) {
      links.push({ href: "/post-job", label: "Post a Job" });
      links.push({ href: "/matches", label: "Find KerjaMates" });
    }

    // Common links for all logged in users
    links.push({ href: "/wallet", label: "Wallet" });
    links.push({ href: "/settings", label: "Settings" });

    return links;
  };

  const navLinks = getNavLinks();
  const isLoggedIn = !!currentUser;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 mr-2 relative">
                <Image
                  src="/logo.png"
                  alt="KerjaBantu Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold font-montserrat bg-gradient-to-r from-[#FF3B30] to-[#FF5E54] bg-clip-text text-transparent">KerjaBantu</span>
            </Link>
          </div>
          
          {/* Desktop menu - only show on larger screens and when there aren't too many items */}
          {!isMobileView && (
            <div className="hidden lg:flex lg:items-center lg:space-x-2">
              {navLinks.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href} 
                  className="text-gray-700 hover:text-primary px-2 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* User profile button */}
              {isLoggedIn && (
                <Link href="/settings" className="ml-2 bg-gradient-to-r from-[#FF3B30] to-[#FF5E54] text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] flex items-center gap-1">
                  <UserCircleIcon className="h-4 w-4" />
                  {currentUser.name.split(' ')[0]}
                </Link>
              )}
              
              {/* Login/Register buttons */}
              {!isLoggedIn && (
                <div className="flex items-center space-x-2 ml-2">
                  <Link href="/login" className="text-gray-700 hover:text-primary px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200">
                    Login
                  </Link>
                  <Link href="/register" className="bg-gradient-to-r from-[#FF3B30] to-[#FF5E54] text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-2px]">
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {/* Mobile/burger menu button - show on all mobile devices or when there are many items */}
          <div className={`flex items-center ${isMobileView ? '' : 'lg:hidden'}`}>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-700 hover:text-primary focus:outline-none"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/burger menu dropdown */}
      {isMenuOpen && (
        <div className="bg-white border-t border-gray-100 shadow-lg rounded-b-xl animate-fadeIn absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href} 
                className="text-gray-700 hover:text-primary hover:bg-gray-50 block px-3 py-2 rounded-lg text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Login/Register or user profile */}
            {isLoggedIn ? (
              <>
                <div className="border-t border-gray-100 my-2"></div>
                <Link href="/settings" className="block">
                  <div className="px-3 py-2 flex items-center hover:bg-gray-50 rounded-lg">
                    {currentUser.avatar && (
                      <div className="mr-3">
                        <ProfileAvatar 
                          src={currentUser.avatar} 
                          alt={currentUser.name} 
                          size={32}
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-800">{currentUser.name}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <div className="border-t border-gray-100 my-2"></div>
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-primary hover:bg-gray-50 block px-3 py-2 rounded-lg text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-gradient-to-r from-[#FF3B30] to-[#FF5E54] text-white block px-3 py-2 rounded-lg text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 