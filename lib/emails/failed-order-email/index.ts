import nodemailer from "nodemailer";

export async function failedOrderEmail(
  email: string,
  courseName: string,
  name: string
) {
  const sender = process.env.NODEMAILER_EMAIL;
  const password = process.env.NODEMAILER_EMAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: sender,
      pass: password,
    },
  });

  console.log("email",email);
  console.log(courseName);
  
  

  await transporter
    .sendMail({
      from: sender,
      to: email,
      replyTo: sender,
      subject: `From dev academy: complete your purchase.`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0; width: 100%; height: 100%;">
       <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; background-color: #f4f4f4; text-align: center;">
         <tr>
           <td style="padding: 40px 0;">
             <table align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); text-align: center;">
               <tr>
                 <td>
                   <h2 style="color: #333333; margin-bottom: 20px;">Hey we have noticed that you tried to enroll on ${courseName}.</h2>
                   <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">Hey ${name}, This mail sent you to give you the reminder for your interst in ${courseName}.</p>
                   <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">Checkout fast, seats are limited.</p>
                   <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">From: ${sender}</p>
                   <p style="font-size: 14px; color: #777777;">This is an automated message, please do not reply.</p>
                 </td>
               </tr>
             </table>
           </td>
         </tr>
       </table>
     </div>`,
    })
    .catch((error) => {
      console.log(error);
    });
}
