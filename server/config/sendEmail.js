import { Resend } from "resend";
import dotenv from "dotenv"
dotenv.config()
if (!process.env.RESEND_API) {
    console.log("Provide Resend Api Key inside .env");  
}
const resend = new Resend(process.env.RESEND_API);

const sendEmail= async({sendTo,subject,html})=>{

    try {
          const { data, error } = await resend.emails.send({
    from: 'Blinkit <onboarding@resend.dev>',
   to: sendTo,
    subject: subject,
    html: html
  });
    if (error) {
    console.log("Resend Email Error",error.message);
  }
    
  return data;

    } catch (error) {
        console.log(error);
        
    }
}
export default sendEmail
