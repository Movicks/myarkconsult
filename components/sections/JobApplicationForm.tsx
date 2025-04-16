import React from 'react';
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { sendApplication } from '@/actions/sendApplication';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  resumeLink: z.string().optional(),
  resumeFile: z.instanceof(File).optional(),
  coverLetter: z.string(),
  linkedin: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).superRefine((data, ctx) => {
  if (!data.resumeFile && !data.resumeLink) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Either a resume file or link is required",
      path: ["resumeFile"],
    });
  }
  if (data.resumeFile && data.resumeLink) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please provide either a file or a link, not both",
      path: ["resumeFile"],
    });
  }
});

const JobApplicationForm = ({ selectedJob, setSelectedJob }: any) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      resumeLink: "",
      coverLetter: "",
      linkedin: "",
      termsAccepted: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Append all form data
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'resumeFile' && value instanceof File) {
            formData.append(key, value, value.name);
          } else if (key !== 'resumeFile') {
            formData.append(key, value.toString());
          }
        }
      });

      // Add job information
      if (selectedJob) {
        formData.append('jobTitle', selectedJob.title);
        formData.append('jobId', selectedJob.id || '');
      }

      // Call server action
      const result = await sendApplication(formData);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
          variant: "default",
        });
        setIsSubmitted(true);
        form.reset();
        setSelectedJob(null);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedJob) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Apply for a Position</h2>
        <p className="text-gray-600">Select a job from the list above to begin your application.</p>
      </div>
    );
  }

  if (isSubmitted)  {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Application Submitted!</h2>
        <p className="text-gray-600 mb-6">Thank you for applying to {selectedJob.title}.</p>
        <Button 
          onClick={() => setIsSubmitted(false)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Apply for another position
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-8 mx-4 mb-10">
      <h2 className="text-2xl font-semibold mb-2 text-blue-500">Apply for: <span className="text-black">{selectedJob.title}</span></h2>
      <p className="text-gray-600 mb-6">{selectedJob.location} • {selectedJob.type}</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6" encType="multipart/form-data">
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

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Address Information</h3>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Province</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="ZIP/Postal Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="resumeFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Resume (PDF, DOC, DOCX)</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                        if (file) {
                          form.setValue('resumeLink', '');
                          form.clearErrors('resumeFile');
                          form.clearErrors('resumeLink');
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <FormField
              control={form.control}
              name="resumeLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume Link (Google Drive, Dropbox, etc.)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://..." 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.target.value) {
                          form.setValue('resumeFile', undefined);
                          form.clearErrors('resumeFile');
                          form.clearErrors('resumeLink');
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Please provide either a file upload or a link to your resume
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Display custom validation errors */}
            {form.formState.errors.resumeFile && (
              <p className="text-sm font-medium text-red-500">
                {form.formState.errors.resumeFile.message}
              </p>
            )}
          </div>
          
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
            <Button
              type="submit"
              disabled={!form.formState.isValid || isSubmitting}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-300"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobApplicationForm;