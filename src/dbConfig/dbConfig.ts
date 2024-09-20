import mongoose from "mongoose";

export async function connect(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Successfully connected to the database");
  }
  catch (err) {

    console.error("Something went wrong while connecting to the database");

    console.error(err);

  }
}
