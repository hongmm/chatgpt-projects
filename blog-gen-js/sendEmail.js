import nodemailer from 'nodemailer';
import 'dotenv/config';

const sendEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      
      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: 'jay2015@gmail.com',
        subject: 'A quick summary about: '+data.topic,
        text: data.content
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};

export default sendEmail;
