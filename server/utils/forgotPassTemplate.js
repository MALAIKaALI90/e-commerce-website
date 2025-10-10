const forgotPassTemplate = ({ username, otp }) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:20px; color:#333;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      
      <h2 style="text-align:center; color:#4CAF50;">Password Reset Request</h2>
      <p style="font-size:16px;">Hi <b>${username}</b>,</p>
      <p style="font-size:15px; line-height:1.6;">
        We received a request to reset your password. Please use the following OTP code to proceed:
      </p>

      <div style="text-align:center; margin:30px 0;">
        <span style="display:inline-block; padding:15px 25px; font-size:20px; font-weight:bold; color:#ffffff; background:#4CAF50; border-radius:8px; letter-spacing:3px;">
          ${otp}
        </span>
      </div>

      <p style="font-size:14px; color:#666;">
        ⚠️ This OTP is valid for <b>1 hour</b>. If you didn’t request this, you can safely ignore this email.
      </p>

      <hr style="margin:25px 0; border:none; border-top:1px solid #eee;" />

      <p style="font-size:13px; color:#999; text-align:center;">
        Thank you,<br/>
        <b>Your Support Team Blinkit</b>
      </p>
    </div>
  </div>
  `;
};
export default forgotPassTemplate