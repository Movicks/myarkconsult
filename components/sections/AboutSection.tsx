import React from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const AboutSection = () => {
  const strengths = [
    'Specialized in Contact Center optimization',
    'End-to-end BPO consulting expertise',
    'Data-driven CX enhancement strategies',
    'Proven track record with global clients'
  ];

  return (
    <section id="about" className="py-10 bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <div className="absolute top-0 left-0 w-64 h-64 -mt-6 -ml-6 border-2 border-consultant-blue"></div>
              <div className="relative z-10 overflow-hidden rounded-lg shadow-xl bg-consultant-dark p-1">
                <div className="bg-white rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-6">Our Approach</h3>
                  
                  <div className="space-y-4">
                    {strengths.map((strength, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="text-consultant-blue mr-3 h-6 w-6 flex-shrink-0" />
                        <p className="text-gray-700">{strength}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-6">
              <div>
                <h4 className="text-consultant-blue font-semibold mb-2">ABOUT US</h4>
                <h2 className="section-title leading-tight">
                  <span className="text-consultant-blue">We Transform</span> <br />
                  <span className="text-gray-900">Customer Experience</span>
                </h2>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                MyArk Consulting was founded with a clear mission: to help businesses elevate their customer experience 
                management through optimized contact center operations and BPO excellence. We combine deep industry knowledge 
                with innovative strategies to deliver measurable improvements in customer satisfaction and operational efficiency.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Our team of experts brings decades of combined experience in customer experience management, 
                contact center operations, and business process outsourcing, enabling us to develop 
                customized solutions that drive meaningful results for our clients.
              </p>
              
              <Link href="about" className="consultant-btn inline-block mt-4">
                Read More...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;