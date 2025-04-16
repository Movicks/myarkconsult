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
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #2563eb;
            color: white;
            padding: 25px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .content {
            padding: 25px;
            border: 1px solid #e2e8f0;
            border-top: none;
            border-radius: 0 0 8px 8px;
          }
          h1 {
            margin: 0;
            font-size: 24px;
          }
          h2 {
            color: #2563eb;
            font-size: 20px;
            margin-top: 25px;
            margin-bottom: 15px;
          }
          .info-card {
            background-color: #f8fafc;
            border-left: 4px solid #2563eb;
            padding: 15px;
            margin: 15px 0;
            border-radius: 0 4px 4px 0;
          }
          .button {
            display: inline-block;
            background-color: #2563eb;
            color: white !important;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin-top: 10px;
          }
          .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #64748b;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>New Candidate Application</h1>
          <p>${data.jobTitle}</p>
        </div>
        
        <div class="content">
          <div class="info-card">
            <h3>Candidate Details</h3>
            <p><strong>${data.firstName} ${data.lastName}</strong></p>
            <p>Email: ${data.email}</p>
            <p>Phone: ${data.phone}</p>
            ${data.linkedin ? `<p>LinkedIn: <a href="${data.linkedin}" target="_blank">View Profile</a></p>` : ''}
          </div>
          
          <h2>Location</h2>
          <p>${data.address}<br>
          ${data.city}, ${data.state} ${data.postalCode}<br>
          ${data.country}</p>
          
          <h2>Application Materials</h2>
          ${data.resumeLink ? 
            `<a href="${data.resumeLink}" class="button">View Resume Online</a>` : 
            '<p>Resume attached to this email</p>'}
          
          <h2>Cover Letter</h2>
          <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px;">
            <p>${data.coverLetter || 'No cover letter provided'}</p>
          </div>
          
          <div class="footer">
            <p>This application was submitted via MyArk Careers Portal</p>
          </div>
        </div>
      </body>
    </html>
    `;

    // Create email content for applicant
    const applicantEmailHtml = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #2563eb;
            color: white;
            padding: 25px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .content {
            padding: 25px;
            border: 1px solid #e2e8f0;
            border-top: none;
            border-radius: 0 0 8px 8px;
          }
          h1 {
            margin: 0;
            font-size: 24px;
          }
          .highlight {
            background-color: #dbeafe;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
          }
          .summary-item {
            margin-bottom: 10px;
          }
          .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #64748b;
            text-align: center;
          }
          .signature {
            color: #2563eb;
            font-weight: 500;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Thank You for Applying, ${data.firstName}!</h1>
        </div>
        
        <div class="content">
          <p>We appreciate your interest in joining our team.</p>
          
          <div class="highlight">
            <p>Your application for <strong>${data.jobTitle}</strong> has been received. Our talent team will review it carefully and contact you if your qualifications match our requirements.</p>
          </div>
          
          <h2>Application Summary</h2>
          
          <div class="summary-item"><strong>Name:</strong> ${data.firstName} ${data.lastName}</div>
          <div class="summary-item"><strong>Email:</strong> ${data.email}</div>
          <div class="summary-item"><strong>Phone:</strong> ${data.phone}</div>
          ${data.linkedin ? `<div class="summary-item"><strong>LinkedIn:</strong> ${data.linkedin}</div>` : ''}
          <div class="summary-item"><strong>Position:</strong> ${data.jobTitle}</div>
          
          <p>If you need to update any information, please reply to this email.</p>
          
          <div class="footer">
            <p>We appreciate your interest in MyArk!</p>
            <p class="signature">The MyArk Hiring Team</p>
          </div>
        </div>
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