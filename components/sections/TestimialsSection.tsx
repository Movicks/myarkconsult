import React from 'react';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CX Director, TechCorp",
    quote: "MyArk Consult transformed our contact center operations, improving CSAT scores by 32% in just three months. Their strategic approach and deep industry knowledge were exactly what we needed.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Michael Chen",
    position: "COO, Global Services Inc.",
    quote: "Working with MyArk Consult on our BPO strategy was game-changing. Their team provided actionable insights that helped us optimize costs while improving quality and customer satisfaction.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Jessica Rodriguez",
    position: "VP Customer Experience, Retail Chain",
    quote: "The performance analytics framework developed by MyArk gave us visibility into our customer journey that we never had before. We've seen a 40% reduction in customer effort scores since implementation.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "David Thompson",
    position: "Head of Operations, FinTech Solutions",
    quote: "MyArk Consult's approach to CX strategy development was thorough and insightful. They took the time to understand our unique challenges and delivered a roadmap that has genuinely transformed our customer experience.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop"
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-consultant-light">
      <div className="section-container">
        <div className="text-center mb-16">
          <h4 className="text-consultant-blue font-semibold mb-2">TESTIMONIALS</h4>
          <h2 className="section-title text-consultant-dark">What Our Clients Say</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            We're proud of the results we deliver for our clients. Here's what they have to say about working with MyArk Consult.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg h-full flex flex-col">
                    <div className="flex items-center mb-4 space-x-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-consultant-blue text-consultant-blue" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 italic mb-6 flex-grow">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center mt-auto">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4 bg-gray-100">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-consultant-dark">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative inset-0 translate-y-0 left-0 right-auto" />
              <CarouselNext className="relative inset-0 translate-y-0 right-0 left-auto" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
