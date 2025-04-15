import React from 'react';
import { ArrowRight } from 'lucide-react';
// import BallScene from '../ui/BallScene';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center">
      {/* Background with diagonal split */}
      {/* <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-consultant-dark" style={{ clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)' }}></div>
        <div className="absolute top-0 right-0 h-full w-1/3 bg-consultant-blue opacity-10"></div>
      </div> */}
      <div className='w-full h-full'>
        <Image src="/BG-IMAGE-MY-ARK.avif" alt='hero' fill className='object-cover w-full h-full' />
      </div>
      
      <div className="container mx-auto px-4 lg:px-10 z-10 w-full flex items-center justify-center bg-blue-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-red-500">
          <div className="animate-fade-in text-white w-full flex flex-col justify-center md:pr-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-center md:text-left">
              Elevating <span className="text-consultant-blue">Customer Experience</span> Management
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg mix-blend-difference text-white text-center md:text-left w-full inverted-text">
              Expert consulting for Contact Centers and BPO operations to transform customer interactions and drive business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <a href="#contact" className="consultant-btn inline-flex items-center justify-center hover:bg-white hover:text-blue-500">
                Book a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#services" className="px-6 py-3 bg-white bg-opacity-10 text-blue-500 font-semibold rounded transition-all duration-300 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 inline-flex items-center justify-center">
                Explore Services
              </a>
            </div>
          </div>
          
          {/* <div className="hidden md:block">
            <div className="relative w-full h-full">
              Animated background shapes
              <div className="absolute -top-16 -left-16 w-40 h-40 bg-consultant-blue rounded-full opacity-10 animate-pulse z-[-1]"></div>
              <div className="absolute top-20 -right-12 w-28 h-28 bg-consultant-blue rounded-full opacity-5 animate-pulse" style={{animationDelay: "1s"}}></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-consultant-blue rounded-full opacity-15 animate-pulse" style={{animationDelay: "0.5s"}}></div>
                

              3D Ball Scene
              <div className="relative z-10 bg-transparent rounded-lg min-h-[25rem] h-full w-full">
                <BallScene />
              </div>
              Modern data visualization
              <div className="relative z-10 bg-transparent rounded-lg min-h-[25rem]">
  
              <div className="absolute top-20 left-70 w-40 h-40 bg-consultant-blue rounded-full opacity-20 animate-pulse z-[-1]" style={{animationDelay: "1.5s"}}></div>
              <div className="absolute -top-40 right-10 w-28 h-28 bg-consultant-blue rounded-full opacity-10 animate-pulse" style={{animationDelay: "2s"}}></div>
              <div className="absolute -bottom-20 left-[30rem] w-32 h-32 bg-consultant-blue rounded-full opacity-15 animate-pulse" style={{animationDelay: "0.9s"}}></div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
