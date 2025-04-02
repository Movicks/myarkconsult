import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Contact', href: '#contact' },
        // { label: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        // { label: 'Blog', href: '#' },
        // { label: 'Case Studies', href: '#' },
        { label: 'Testimonials', href: '#' },
        { label: 'FAQ', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-consultant-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <a href="#" className="text-[1.7rem] md:text-[2.3rem] font-bold mb-4 inline-block">
              <span className="text-consultant-blue">MyArk</span>Consult
            </a>
            <p className="text-gray-400 mb-6 max-w-sm">
              Expert consulting services tailored to help your business overcome challenges 
              and achieve sustainable growth.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-lightGray p-2 rounded hover:bg-opacity-20 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-500 text-sm">&copy; {currentYear} MyArk Consulting. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Designed with excellence for MyArk success
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
