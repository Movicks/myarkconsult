import React from 'react';
import { Headphones, LineChart, Users, BarChart3 } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: <Headphones className="h-10 w-10 text-consultant-blue" />,
      title: 'Contact Center Optimization',
      description:
        'Enhance your contact center operations with strategic process improvements, technology integration, and performance metrics optimization.',
    },
    {
      icon: <LineChart className="h-10 w-10 text-consultant-blue" />,
      title: 'CX Strategy Development',
      description:
        'Create comprehensive customer experience strategies that align with your business goals, improve satisfaction, and drive customer loyalty.',
    },
    {
      icon: <Users className="h-10 w-10 text-consultant-blue" />,
      title: 'BPO Advisory Services',
      description:
        'Expert guidance on business process outsourcing, from vendor selection and transition management to ongoing performance optimization.',
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-consultant-blue" />,
      title: 'Performance Analytics',
      description:
        'Advanced analytics solutions to measure, track, and improve key performance indicators across your customer service operations.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-consultant-dark text-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h4 className="text-consultant-blue font-semibold mb-2">OUR SERVICES</h4>
          <h2 className="section-title">CX Management Excellence</h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            We offer specialized consulting services designed to transform your customer experience, contact center operations, and BPO processes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-lightGray p-6 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:transform hover:translate-y-[-5px]"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="mb-6 text-gray-300">
            Need custom solutions for your CX or contact center challenges?
          </p>
          <a href="#contact" className="consultant-btn inline-block">
            Schedule a Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
