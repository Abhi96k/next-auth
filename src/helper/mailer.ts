import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userID }) => {
  try {
    const transporter = nodemailer.createTransport({
      host:"sandbox"
    });
  } catch (err) {
    console.error(err);
    console.log("Error sending email");
  }
};
