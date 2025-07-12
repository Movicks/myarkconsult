"use client"

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { sendEmail } from '@/actions/sendEmail';


type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FieldErrors = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/[\s()-]/g, ''));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
  
    const newErrors: FieldErrors = {
      name: formData.name.trim() ? '' : 'Name is required',
      email: !formData.email.trim() ? 'Email is required' : !validateEmail(formData.email) ? 'Please enter a valid email address' : '',
      phone: !validatePhone(formData.phone) ? 'Please enter a valid phone number (+XX XXXX XXXXXX)' : '',
      message: formData.message.trim() ? '' : 'Message is required',
    };
  
    setFieldErrors(newErrors);
  
    const hasError = Object.values(newErrors).some(err => err !== '');
    if (hasError) {
      setIsSubmitting(false);
      return;
    }
  
    try {
      const result = await sendEmail(formData);
      if (result?.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setFieldErrors({ name: '', email: '', phone: '', message: '' });
      } else {
        setError(result?.error || 'Failed to send message');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-secondary" />,
      title: 'Email Us',
      details: 'info@myarkconsult.com',
      action: 'mailto:info@myarkconsult.com',
    },
    {
      icon: <Phone className="h-6 w-6 text-secondary" />,
      title: 'Call Us',
      details: '+ (234) 706-202-8202',
      action: 'tel:+2347062028202',
    },
    {
      icon: <MapPin className="h-6 w-6 text-secondary" />,
      title: 'Visit Us',
      details: '123 Business Ave, Suite 500, New York, NY 10001',
      action: 'https://maps.google.com',
    },
  ];

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h4 className="relative w-fit mx-auto text-gray-900 font-semibold mb-2 text-xl md:text-2xl leading-[140%] before:absolute before:content-[''] before:left-1/2 before:translate-x-[-50%] before:bottom-0 before:w-1/2 before:h-[2px] before:bg-secondary before:rounded-full">
            GET IN TOUCH
          </h4>
          <h2 className="font-bold tracking-tight text-gray-900 text-3xl sm:text-5xl lg:text-5xl mb-4">
            <span className="leading-[140%] text-blue-600">Contact Us</span> <span className="text-gray-900">Today</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Have questions or ready to start your journey with us? Reach out today and our team of experts will get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:flex lg:flex-row-reverse">
          <div className="lg:w-2/3 lg:col-span-2 bg-blue-50/40 p-8 border border-gray-100">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Your message has been sent successfully. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${fieldErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors`}
                      placeholder="John Doe"
                    />
                    {fieldErrors.name && <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors`}
                      placeholder="john@example.com"
                    />
                    {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${fieldErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {fieldErrors.phone && <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border resize-none ${fieldErrors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors`}
                    placeholder="Tell us about your business challenges..."
                  ></textarea>
                  {fieldErrors.message && <p className="text-red-500 text-sm mt-1">{fieldErrors.message}</p>}
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-100">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="lg:w-1/3 lg:col-span-1 space-y-2 md:space-y-8">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start bg-blue-50/40 px-6 py-6">
                <div className="bg-white p-3 rounded-lg mr-4 shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 mb-1 text-sm">{item.details}</p>
                  <a
                    href={item.action}
                    className="text-blue-600 text-sm font-medium hover:underline flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Connect <span className="ml-1">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div> 
        </div>
      </div>
    </section>
  );
};

export default ContactSection;