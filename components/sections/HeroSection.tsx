import React from 'react';
import { ArrowRight } from 'lucide-react';
// import BallScene from '../ui/BallScene';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/BG-IMAGE-MY-ARK.avif"
          alt="hero"
          fill
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center bg-black/40">
        <div className="container mx-auto px-4 lg:px-10 w-full">
          <div className="flex gap-8 items-center justify-center text-white">
            <div className="animate-fade-in text-white w-full flex flex-col items-center text-center justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight max-w-[60rem]">
                Elevating <span className="text-consultant-blue">Customer Experience</span> Management
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mix-blend-difference">
                Expert consulting for Contact Centers and BPO operations to transform customer interactions and drive business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center md:items-start">
                <a href="#contact" className="consultant-btn w-full whitespace-nowrap lg:w-[15rem] inline-flex items-center justify-center hover:bg-white hover:text-blue-500">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="#services"
                  className="w-full lg:w-[15rem] px-6 py-3 bg-white bg-opacity-10 text-blue-500 font-semibold rounded transition-all duration-300 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 inline-flex items-center justify-center"
                >
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default HeroSection;
