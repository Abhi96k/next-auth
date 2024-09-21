import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    console.log("This token is From Helper Function Token:- ", token);

    const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET!);

    console.log(
      "This token is From Helper Function Decoded Token:- ",
      decodedToken
    );

    return decodedToken;
  } catch (err) {
    console.error(err);
  }
};
