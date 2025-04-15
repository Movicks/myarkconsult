"use client"
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import CareerFilters from '@/components/sections/CareerFilters';
import CareersList from '@/components/sections/CareersList';
import JobApplicationForm from '@/components/sections/JobApplicationForm';
import JobDetailsDialog from '@/components/sections/JobDetailsDialog';
import { JobCategory, jobListings } from '@/data/jobListings';

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
      <div className="pt-24 bg-gray-50 lg:px-7">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-consultant-blue">Join Our</span> Team
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're always looking for talented professionals to help us deliver exceptional customer experience solutions. Explore our open positions below.
            </p>
          </div>
          
          <CareerFilters onFilter={handleFilter} />
          
          <div className="mt-8">
            <CareersList 
              jobs={filteredJobs} 
              onJobSelect={handleJobSelect} 
              selectedJobId={selectedJob?.id}
              onViewDetails={handleViewDetails}
            />
          </div>

          <div id="application-form" className="mt-16">
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