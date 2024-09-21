import { Html } from "next/document";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userID }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.forwardemail.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "abhisheknangare96k@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    };
  } catch (err) {
    console.error(err);
    console.log("Error sending email");
  }
};
