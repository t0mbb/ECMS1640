import nodemailer from "nodemailer"; 

const transporter = nodemailer.createTransport({
    host: process.env.NAMEGMAIL,
    port: 465,
    secure: true, 
    auth: {
      user: process.env.authUSER,
      pass: process.env.authPASS,
    },
  });


export const sendMail = async (email : string ) => {
    const mailOptions = {
        from: "Cms1640@gmail.com",
        to: email,
        subject: "Marketing Coordinator !!!!!   ",
        text: "This is a test email sent to Marketing Coordinator !!!!! ",
      };
    await transporter.sendMail(mailOptions)
}