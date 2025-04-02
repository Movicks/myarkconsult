import React from 'react';
import { ArrowRight, CheckCircle, BarChart3, LineChart, Users, Headphones } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white px-4 lg:px-10">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-consultant-blue">About</span> <span className="text-gray-900">MyArk Consult</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transforming customer experiences through innovative contact center and BPO solutions
            </p>
          </div>
        </div>
      </section>
      
      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-consultant-blue">Our</span> <span className="text-gray-900">Story</span>
              </h2>
              <p className="text-gray-700 mb-4">
                Founded in 2015, MyArk Consult has grown from a small team of CX specialists to a leading consultancy firm dedicated to transforming customer experience management across industries.
              </p>
              <p className="text-gray-700 mb-4">
                Our journey began with a simple mission: to help businesses elevate their customer experience through optimized contact center operations and BPO excellence. Today, we're proud to serve clients globally, delivering measurable improvements in customer satisfaction and operational efficiency.
              </p>
              <p className="text-gray-700">
                What sets us apart is our data-driven approach combined with deep industry knowledge, allowing us to develop tailored strategies that address the unique challenges of each organization we work with.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 left-0 w-64 h-64 -mt-6 -ml-6 border-2 border-consultant-blue"></div>
              <div className="relative z-10 overflow-hidden rounded-lg shadow-xl bg-consultant-dark p-1">
                <div className="bg-white rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-6">Our Values</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="text-consultant-blue mr-3 h-6 w-6 flex-shrink-0" />
                      <p className="text-gray-700">Client-centered approach in everything we do</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="text-consultant-blue mr-3 h-6 w-6 flex-shrink-0" />
                      <p className="text-gray-700">Data-driven decision making and strategy</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="text-consultant-blue mr-3 h-6 w-6 flex-shrink-0" />
                      <p className="text-gray-700">Continuous innovation in CX methodologies</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="text-consultant-blue mr-3 h-6 w-6 flex-shrink-0" />
                      <p className="text-gray-700">Integrity and transparency in our partnerships</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CX Performance Impact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-consultant-blue">CX Performance</span> <span className="text-gray-900">Impact</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our consulting services deliver measurable improvements across key customer experience metrics
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Animated background shapes */}
              <div className="absolute -top-16 -left-16 w-40 h-40 bg-consultant-blue rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute top-20 -right-12 w-28 h-28 bg-consultant-blue rounded-full opacity-10 animate-pulse" style={{animationDelay: "1s"}}></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-consultant-blue rounded-full opacity-15 animate-pulse" style={{animationDelay: "0.5s"}}></div>
              
              {/* Performance metrics card */}
              <div className="relative z-10 bg-white backdrop-blur-sm p-8 rounded-lg shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-gray-800">CSAT Score Improvement</span>
                        <span className="font-bold text-consultant-blue">+75%</span>
                      </div>
                      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-consultant-blue to-consultant-blue-light rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-gray-800">First Contact Resolution</span>
                        <span className="font-bold text-consultant-blue">+68%</span>
                      </div>
                      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-consultant-blue to-consultant-blue-light rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-gray-800">Agent Efficiency</span>
                        <span className="font-bold text-consultant-blue">+82%</span>
                      </div>
                      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-consultant-blue to-consultant-blue-light rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-gray-800">Customer Effort Score</span>
                        <span className="font-bold text-consultant-blue">-45%</span>
                      </div>
                      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-consultant-blue to-consultant-blue-light rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-gray-800">Net Promoter Score</span>
                        <span className="font-bold text-consultant-blue">+63%</span>
                      </div>
                      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-consultant-blue to-consultant-blue-light rounded-full" style={{ width: '63%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-gray-800">Cost Per Resolution</span>
                        <span className="font-bold text-consultant-blue">-38%</span>
                      </div>
                      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-consultant-blue to-consultant-blue-light rounded-full" style={{ width: '38%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-800">Overall CX Transformation</span>
                    <div className="text-consultant-blue font-bold text-2xl">94%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Expertise */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-consultant-blue">Our</span> <span className="text-gray-900">Expertise</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized consulting services designed to transform your customer experience operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:transform hover:translate-y-[-5px]">
              <div className="mb-4 text-consultant-blue">
                <Headphones className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Contact Center Optimization</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Enhance your contact center operations with strategic process improvements, technology integration, and performance metrics optimization.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:transform hover:translate-y-[-5px]">
              <div className="mb-4 text-consultant-blue">
                <LineChart className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">CX Strategy Development</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Create comprehensive customer experience strategies that align with your business goals, improve satisfaction, and drive customer loyalty.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:transform hover:translate-y-[-5px]">
              <div className="mb-4 text-consultant-blue">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">BPO Advisory Services</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Expert guidance on business process outsourcing, from vendor selection and transition management to ongoing performance optimization.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:transform hover:translate-y-[-5px]">
              <div className="mb-4 text-consultant-blue">
                <BarChart3 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Performance Analytics</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Advanced analytics solutions to measure, track, and improve key performance indicators across your customer service operations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Get in Touch */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-consultant-blue">Get in</span> <span className="text-gray-900">Touch</span>
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Ready to transform your customer experience management? Contact us today to schedule a consultation with our experts.
            </p>
            <a href="#contact" className="consultant-btn inline-flex items-center justify-center">
              Contact Us Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;