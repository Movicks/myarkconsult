"use client"
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import CareerFilters from '@/components/sections/CareerFilters';
import CareersList from '@/components/sections/CareersList';
import JobApplicationForm from '@/components/sections/JobApplicationForm';
import JobDetailsDialog from '@/components/sections/JobDetailsDialog';
import { JobCategory, jobListings } from '@/data/jobListings';
import Image from 'next/image';

export type JobListing = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  category: JobCategory;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postDate: string;
};

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>(jobListings);
  const [detailsJob, setDetailsJob] = useState<JobListing | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();
  
  const handleJobSelect = (job: JobListing) => {
    setSelectedJob(job);
    window.scrollTo({
      top: document.getElementById('application-form')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };
  
  const handleViewDetails = (job: JobListing) => {
    setDetailsJob(job);
    setIsDetailsOpen(true);
  };
  
  const handleFilter = (filters: {
    department: string;
    location: string;
    type: string;
    category: string;
  }) => {
    let filtered = [...jobListings];
    
    if (filters.department && filters.department !== 'all-departments') {
      filtered = filtered.filter(job => job.department === filters.department);
    }
    
    if (filters.location && filters.location !== 'all-locations') {
      filtered = filtered.filter(job => job.location === filters.location);
    }
    
    if (filters.type && filters.type !== 'all-types') {
      filtered = filtered.filter(job => job.type === filters.type);
    }
    
    if (filters.category && filters.category !== 'all-categories') {
      filtered = filtered.filter(job => job.category === filters.category);
    }
    
    setFilteredJobs(filtered);
  };
  
  const handleApplicationSubmit = (data: any) => {
    toast({
      title: "Application Submitted!",
      description: "We've received your application and will be in touch soon.",
    });
    setSelectedJob(null);
  };

  return (
    <>
      <div className="bg-gray-50">
        <div className="">
            {/* hero section */}
            <div className='relative'>
                <div className="relative h-[35rem] bg-gradient-to-b from-white to-gray-50">
                    <div className="absolute inset-0">
                        <Image
                        src="/BG-IMAGE-MY-ARK.avif"
                        alt="hero"
                        fill
                        className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="relative z-0 w-full h-full flex flex-col items-center justify-center bg-black/40 text-center mb-12 px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-consultant-blue">Join Our</span> <span className='text-gray-200'>Team</span>
                        </h1>
                        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                        We're always looking for talented professionals to help us deliver exceptional customer experience solutions. Explore our open positions below.
                        </p>
                    </div>
                </div>
                
                <div className='absolute px-4 md:px-10 -mt-[6rem] w-full'>
                    <CareerFilters onFilter={handleFilter} />
                </div>
            </div>
          
            <div className="mt-[20rem] md:mt-[12rem] lg:mt-23 px-4 md:px-10">
                <CareersList 
                jobs={filteredJobs} 
                onJobSelect={handleJobSelect} 
                selectedJobId={selectedJob?.id}
                onViewDetails={handleViewDetails}
                />
            </div>

            <div id="application-form" className="mt-16 lg:px-[20rem]">
                <JobApplicationForm selectedJob={selectedJob} onSubmit={handleApplicationSubmit} />
            </div>
        </div>
      </div>
      
      <JobDetailsDialog 
        job={detailsJob}
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onApply={handleJobSelect}
      />
      
    </>
  );
};

export default Careers;