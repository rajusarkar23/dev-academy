import nodemailer from "nodemailer";

export async function otpVerifyEmail(
  otp: string,
  email: string,
  mailType: string,
  courseName? : string,
  seats?: string,
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

  if (mailType === "verificationMail") {
    await transporter
      .sendMail({
        from: sender,
        to: email,
        replyTo: sender,
        subject: `Your email verification OTP`,
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0; width: 100%; height: 100%;">
       <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; background-color: #f4f4f4; text-align: center;">
         <tr>
           <td style="padding: 40px 0;">
             <table align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); text-align: center;">
               <tr>
                 <td>
                   <h2 style="color: #333333; margin-bottom: 20px;">Here is your OTP</h2>
                   <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">Welcome onboard, Please verify your email with the below OTP.</p>
                   <p style="font-size: 18px; color: #333333; margin-bottom: 30px;"><strong>OTP: ${otp}</strong></p>
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
  } else if (mailType === "successOrderMail") {
    await transporter
      .sendMail({
        from: sender,
        to: email,
        replyTo: sender,
        subject: `Enrollment confirmation`,
        html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0; width: 100%; height: 100%;">
     <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; background-color: #f4f4f4; text-align: center;">
       <tr>
         <td style="padding: 40px 0;">
           <table align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); text-align: center;">
             <tr>
               <td>
                 <h2 style="color: #333333; margin-bottom: 20px;">Enrollments success!!</h2>
                 <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">Hey, you have successfully enrolled in ${courseName}.</p>
                 <p style="font-size: 18px; color: #333333; margin-bottom: 30px;"><strong>Thank you for the purchase.</strong></p>
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
  } else if (mailType === "failedOrderMail") {
    await transporter
    .sendMail({
      from: sender,
      to: email,
      replyTo: sender,
      subject: `Hello from dev academy`,
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0; width: 100%; height: 100%;">
     <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; background-color: #f4f4f4; text-align: center;">
       <tr>
         <td style="padding: 40px 0;">
           <table align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); text-align: center;">
             <tr>
               <td>
                 <h2 style="color: #333333; margin-bottom: 20px;">Hii there..</h2>
                 <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">We have noticed that you have tried to purchase ${courseName}</p>
                 <p style="font-size: 18px; color: #333333; margin-bottom: 30px;"><strong>OTP: Please book your seat assap, only ${seats} are available</strong></p>
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
  } else{
    console.log("provide the correct mail type");
  }
}
