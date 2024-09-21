import nodemailer from "nodemailer";

interface SendEmailProps {
  email: string;
  emailType: "VERIFY" | "RESET";
  userID: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userID,
}: SendEmailProps): Promise<
  { success: boolean; message: string } | nodemailer.SentMessageInfo
> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.forwardemail.net", // Email service host
      port: 465, // Port for secure connection
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Username from environment
        pass: process.env.EMAIL_PASS, // Password from environment
      },
    });

    const mailOptions = {
      from: "abhisheknangare96k@gmail.com", // Sender's email
      to: email, // Receiver's email
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      text: "Hello world?", // Plain text body
      html: "<b>Hello world?</b>", // HTML body
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse; // Return the nodemailer response on success
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, message: "Error sending email" }; // Return error response
  }
};
