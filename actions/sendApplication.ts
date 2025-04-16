'use server';

import { createTransport } from 'nodemailer';
import { z } from 'zod';

// Define the schema for the email data
const emailSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  resumeLink: z.string().optional(),
  coverLetter: z.string(),
  linkedin: z.string().optional(),
  jobTitle: z.string(),
  jobId: z.string().optional(),
});

export async function sendApplication(formData: FormData) {
  try {
    // Parse form data
    const rawData = Object.fromEntries(formData.entries());
    const data = emailSchema.parse(rawData);

    // Extract file if it exists
    const resumeFile = formData.get('resumeFile') as File | null;

    // Create email transporter
    const transporter = createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Create email content for recruiter
    const recruiterEmailHtml = `
      <html>
        <body>
          <h1>New Job Application</h1>
          <h2>Position: ${data.jobTitle}</h2>
          
          <h3>Applicant Information</h3>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          ${data.linkedin ? `<p><strong>LinkedIn:</strong> ${data.linkedin}</p>` : ''}
          
          <h3>Address</h3>
          <p>${data.address}<br>
          ${data.city}, ${data.state} ${data.postalCode}<br>
          ${data.country}</p>
          
          <h3>Resume</h3>
          <p>${data.resumeLink ? 
            `<a href="${data.resumeLink}">View Resume</a>` : 
            'Resume attached to this email'}</p>
          
          <h3>Cover Letter</h3>
          <p>${data.coverLetter || 'No cover letter provided'}</p>
        </body>
      </html>
    `;

    // Create email content for applicant
    const applicantEmailHtml = `
      <html>
        <body>
          <h1>Application Confirmation</h1>
          <p>Dear ${data.firstName} ${data.lastName},</p>
          
          <p>Thank you for applying for the position of <strong>${data.jobTitle}</strong>.</p>
          
          <p>We have received your application and our recruiting team will review it carefully. 
          If your qualifications match our requirements, we will contact you for the next steps 
          in the hiring process.</p>
          
          <p>Here's a summary of the information you submitted:</p>
          <ul>
            <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Phone:</strong> ${data.phone}</li>
            ${data.linkedin ? `<li><strong>LinkedIn:</strong> ${data.linkedin}</li>` : ''}
            <li><strong>Position Applied:</strong> ${data.jobTitle}</li>
          </ul>
          
          <p>If you need to update any information or have any questions, please feel free to 
          reply to this email.</p>
          
          <p>Best regards,<br>
          The Hiring Team</p>
        </body>
      </html>
    `;

    // Prepare email options for recruiter
    const recruiterMailOptions = {
      from: `"Job Application" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      subject: `New Application for ${data.jobTitle}`,
      html: recruiterEmailHtml,
      attachments: resumeFile ? [{
        filename: resumeFile.name,
        content: Buffer.from(await resumeFile.arrayBuffer()),
      }] : [],
    };

    // Prepare email options for applicant
    const applicantMailOptions = {
      from: `"MyArk Hiring Team" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `Application Confirmation for ${data.jobTitle}`,
      html: applicantEmailHtml,
      // Don't attach resume to the confirmation email
    };

    // Send both emails
    await transporter.sendMail(recruiterMailOptions);
    await transporter.sendMail(applicantMailOptions);

    return { 
      success: true, 
      message: `Thank you, ${data.firstName}! Your application for ${data.jobTitle} has been successfully submitted. A confirmation email has been sent to ${data.email}.` 
    };
  } catch (error) {
    console.error('Error sending application:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to submit application. Please try again later.' 
    };
  }
}