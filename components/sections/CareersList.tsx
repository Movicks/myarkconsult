import React from 'react';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
// import { JobListing } from '@/pages/Careers';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { JobListing } from '@/app/(pages)/careers/page';

interface CareersListProps {
  jobs: JobListing[];
  onJobSelect: (job: JobListing) => void;
  selectedJobId: string | undefined;
  onViewDetails: (job: JobListing) => void;
}

const CareersList = ({ jobs, onJobSelect, selectedJobId, onViewDetails }: CareersListProps) => {
  return (
    <div className=''>
      <h2 className="text-2xl font-semibold mb-6">Open Positions ({jobs.length})</h2>
      
      {jobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h3 className="text-xl text-gray-600">No jobs match your filters</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search criteria or check back later for new openings.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => {
            const postDate = new Date(job.postDate);
            const timeAgo = formatDistanceToNow(postDate, { addSuffix: true });
            
            return (
              <div 
                key={job.id} 
                className={`bg-white rounded-lg shadow hover:shadow-md transition-all duration-300 ${
                  selectedJobId === job.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-consultant-blue mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-consultant-blue mr-1" />
                          {job.type}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">{job.description}</div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex flex-col items-start">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-consultant-blue">
                        {job.category}
                      </span>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3 text-consultant-blue mr-1" />
                        Posted {timeAgo}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={() => onViewDetails(job)}
                    >
                      View Details
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                    
                    <Button 
                      size="sm"
                      className="bg-consultant-blue hover:bg-consultant-blue/90 text-white"
                      onClick={() => onJobSelect(job)}
                    >
                      {selectedJobId === job.id ? 'Selected' : 'Apply Now'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CareersList;