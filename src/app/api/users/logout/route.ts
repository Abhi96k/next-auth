import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        message: "User logged out",
      },
      {
        status: 200,
      }
    );


    response.cookies.set("token", "", {
      httpOnly: true,
    });
    

    return NextResponse.json(
      {
        message: "User logged out",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("user does not logout in server", error);
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
