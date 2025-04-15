import React from 'react';
import { Calendar, MapPin, Clock, Briefcase, CheckCircle2 } from 'lucide-react';
// import { JobListing } from '@/pages/Careers';
import { formatDistanceToNow } from 'date-fns';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { JobListing } from '@/app/(pages)/careers/page';

interface JobDetailsDialogProps {
  job: JobListing | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (job: JobListing) => void;
}

const JobDetailsDialog = ({ job, isOpen, onOpenChange, onApply }: JobDetailsDialogProps) => {
  if (!job) return null;
  
  const postDate = new Date(job.postDate);
  const timeAgo = formatDistanceToNow(postDate, { addSuffix: true });
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-white pt-20">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold">{job.title}</DialogTitle>
              <DialogDescription className="mt-2">
                <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-consultant-blue mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-consultant-blue mr-1" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 text-consultant-blue mr-1" />
                    {job.department}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-consultant-blue mr-1" />
                    Posted {timeAgo}
                  </div>
                </div>
              </DialogDescription>
            </div>
            <Badge variant="outline" className="bg-blue-100 text-consultant-blue border-none">
              {job.category}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="my-6">
          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700">{job.description}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Key Responsibilities</h3>
          <ul className="space-y-2">
            {job.responsibilities.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-consultant-blue mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Requirements</h3>
          <ul className="space-y-2">
            {job.requirements.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-consultant-blue mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button 
            onClick={() => {
              onApply(job);
              onOpenChange(false);
            }}
            className="bg-consultant-blue hover:bg-consultant-blue/90"
          >
            Apply Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;