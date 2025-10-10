const verifyEmailTemplate = ({username, url}) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Verify Your Email</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color:#f4f6f8; margin:0; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background:#4F46E5; color:#ffffff; text-align:center; padding:20px;">
        <h2 style="margin:0;">Verify Your Email</h2>
      </div>

      <!-- Content -->
      <div style="padding:30px; text-align:center; color:#333333;">
        <p style="font-size:16px;">Dear <strong>${username}</strong>,</p>
        <p style="margin-top:10px; font-size:15px; line-height:1.6;">
          Thank you for registering with <strong>Blinkit</strong>! <br/>
          Please confirm your email address by clicking the button below:
        </p>

        <a href="${url}" target="_blank" 
          style="display:inline-block; margin-top:20px; padding:12px 24px; background:#4F46E5; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:bold;">
          Verify Email
        </a>

      </div>

      <!-- Footer -->
      <div style="background:#f4f6f8; text-align:center; padding:15px; font-size:12px; color:#888;">
        <p>If you didn’t create an account, you can safely ignore this email.</p>
        <p>&copy; 2025 Blinkit. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};
export  default verifyEmailTemplate