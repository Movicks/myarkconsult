
import React from 'react';
import { useForm } from "react-hook-form";
// import { JobListing } from '@/pages/Careers';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { JobListing } from '@/app/(pages)/careers/page';

interface JobApplicationFormProps {
  selectedJob: JobListing | null;
  onSubmit: (data: any) => void;
}

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  resume: z.string().min(1, "Resume link is required"),
  coverLetter: z.string(),
  linkedin: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

const JobApplicationForm = ({ selectedJob, onSubmit }: JobApplicationFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      resume: "",
      coverLetter: "",
      linkedin: "",
      termsAccepted: false,
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      ...data,
      jobId: selectedJob?.id,
      jobTitle: selectedJob?.title,
    });
    form.reset();
  };

  if (!selectedJob) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Apply for a Position</h2>
        <p className="text-gray-600">Select a job from the list above to begin your application.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-semibold mb-2">Apply for: {selectedJob.title}</h2>
      <p className="text-gray-600 mb-6">{selectedJob.location} • {selectedJob.type}</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 555-5555" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume Link (Google Drive, Dropbox, etc.)</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormDescription>
                  Please provide a link to your resume. You can upload it to Google Drive or Dropbox.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us why you're a great fit for this position..."
                    className="min-h-[200px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/in/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the terms and privacy policy
                  </FormLabel>
                  <FormDescription>
                    By submitting this application, you agree to our processing of your personal data.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-consultant-blue text-white font-semibold rounded hover:bg-opacity-90 transition-colors duration-300"
            >
              Submit Application
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobApplicationForm;
