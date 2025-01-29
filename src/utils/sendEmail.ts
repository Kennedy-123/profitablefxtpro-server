const nodemailer = require('nodemailer')

import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendApprovalEmail = async (to: string, username: string, amount: number, balance: number) => {
  try {
    const mailOptions = {
      from: `Profitablefxtpro <${process.env.EMAIL_USER}>`, // Sender address
      to, // Recipient(s)
      subject: 'Deposit Successful', // Subject line
      text: `Dear ${username},\nYour deposit of $${amount.toFixed(2)} has been credited to your account. Your new balance is $${balance.toFixed(2)}.`, // Plain text body
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #4CAF50;
          color: white;
          text-align: center;
          padding: 10px 0;
          border-radius: 8px 8px 0 0;
        }
        .content {
          padding: 20px;
          color: #333;
        }
        .footer {
          text-align: center;
          color: #777;
          font-size: 12px;
          margin-top: 20px;
        }
        .button {
          display: inline-block;
          background-color: #4CAF50;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Deposit Notification</h1>
        </div>
        <div class="content">
          <p>Dear <b>${username}</b>,</p>
          <p>We are excited to inform you that your deposit of <b>$${amount.toFixed(2)}</b> has been successfully credited to your account.</p>
          <p>Your new account balance is: <b>$${balance.toFixed(2)}</b>.</p>
          <p>Thank you for trusting us!</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `, // HTML body (optional)
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendDeclinedEmail = async (to: string, username: string, amount: number) => {
  try {
    const mailOptions = {
      from: `Profitablefxtpro <${process.env.EMAIL_USER}>`, // Sender address
      to, // Recipient(s)
      subject: '❌ Deposit Declined', // Subject line
      text: `Dear ${username},\nYour deposit of $${amount.toFixed(2)} was declined.`, // Plain text body
      html: `
    <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #D32F2F;
      color: white;
      text-align: center;
      padding: 10px 0;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      color: #333;
    }
    .footer {
      text-align: center;
      color: #777;
      font-size: 12px;
      margin-top: 20px;
    }
    .button {
      display: inline-block;
      background-color: #D32F2F;
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Deposit Declined</h1>
    </div>
    <div class="content">
      <p>Dear <b>${username}</b>,</p>
      <p>We regret to inform you that your deposit of <b>$${amount.toFixed(2)}</b> has been declined.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>

  `, // HTML body (optional)
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
