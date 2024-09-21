import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

connect();

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  try {
    const reqBody = request.body; 
    const { email, password, name } = reqBody;

    console.log(reqBody);

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return response.status(400).json({
        error: "User already exists",
        status: 400,
      });
    }

    // Hash the password
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      email,
      password: hashPassword,
      name,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send verification email
    await sendEmail({
      email,
      emailType: "VERIFY",
      userID: savedUser._id,
    });

    // Return success response
    return response.status(200).json({
      message: "User created successfully",
      status: 200,
    });
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    return response.status(500).json({
      error: error.message,
      status: 500,
    });
  }
}
