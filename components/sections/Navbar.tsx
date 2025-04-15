"use client"

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Services', href: '/#services' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 lg:px-10 flex justify-between items-center">
        <Link href="/" className={cn("text-[1.7rem] md:text-[2.3rem] font-bold flex items-center rounded-lg overflow-hidden", scrolled ? "text-consultant-dark" : "text-white")}>
          <span className="text-consultant-blue md:text-[2.1rem]">MyArk</span>Consult
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(" hover:text-gray-400 font-medium transition-colors duration-300",
                scrolled ? "text-consultant-blue" : "text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="px-4 py-2 bg-consultant-blue text-white rounded hover:bg-opacity-90 transition-colors duration-300"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={cn("md:hidden flex items-center justify-center rounded-lg p-1 hover:bg-gray-500/50 hover:border-2 ", scrolled ? "text-consultant-dark" : "text-white")}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      > 
        <div className="flex flex-col h-full justify-center items-center space-y-8 p-4">
          
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xl font-semibold text-consultant-dark hover:text-consultant-blue"
              onClick={toggleMenu}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="px-6 py-3 bg-consultant-blue text-white rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors duration-300"
            onClick={toggleMenu}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
