'use server'

import nodemailer from 'nodemailer';

type FormData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export async function sendEmail(formData: FormData) {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Modern blue-themed email template
  const emailTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>New Contact Form Submission</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333333;
        max-width: 600px;
        margin: 0 auto;
      }
      .header {
        background-color: #2563eb;
        padding: 10px 20px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .header h1 {
        color: white;
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 30px 20px;
        background-color: #f8fafc;
      }
      .details {
        background-color: white;
        border-radius: 6px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      .detail-item {
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e2e8f0;
      }
      .detail-item:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }
      .label {
        font-weight: 600;
        color: #2563eb;
        display: block;
        margin-bottom: 5px;
      }
      .footer {
        background-color: #2563eb;
        padding: 20px;
        text-align: center;
        border-radius: 0 0 8px 8px;
        color: white;
        font-size: 14px;
      }
      .message-content {
        white-space: pre-wrap;
        background-color: #f1f5f9;
        padding: 15px;
        border-radius: 6px;
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    
    <div class="content">
      <p>You've received a new message from your website contact form:</p>
      
      <div class="details">
        <div class="detail-item">
          <span class="label">Name</span>
          <span>${formData.name}</span>
        </div>
        
        <div class="detail-item">
          <span class="label">Email</span>
          <span>${formData.email}</span>
        </div>
        
        <div class="detail-item">
          <span class="label">Phone</span>
          <span>${formData.phone || 'Not provided'}</span>
        </div>
        
        <div class="detail-item">
          <span class="label">Message</span>
          <div class="message-content">${formData.message}</div>
        </div>
      </div>
      
      <p style="color: #64748b; font-size: 14px;">
        This message was sent from your website contact form. Please respond directly to the sender's email address.
      </p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} MyArkConsult. All rights reserved.</p>
    </div>
  </body>
  </html>
  `;

  // Email options
  const mailOptions = {
    from: `"MyArk Consult Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER || 'info@myarkconsult.com',
    subject: `New Contact: ${formData.name}`,
    text: `
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone || 'Not provided'}
      Message: ${formData.message}
    `,
    html: emailTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}