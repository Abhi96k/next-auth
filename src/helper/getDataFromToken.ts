// import { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export const getDataFromToken = async (request: NextRequest) => {
//   try {
//     const token = request.cookies.get("token")?.value || "";
//     console.log("This token is From Helper Function Token:- ", token);

//     const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET!);

//     console.log(
//       "This token is From Helper Function Decoded Token:- ",
//       decodedToken
//     );

//     return decodedToken;
//   } catch (err) {
//     console.error(err);
//   }
// };

import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request: NextRequest) => {
  try {
    // Get the token from cookies
    const token = request.cookies.get("token")?.value || "";
    console.log("This token is from Helper Function Token:", token);
    // If no token is found, throw an error
    if (!token) {
      throw new Error("Token not found");
    }

   
    interface DecodedToken {
      id: string;
      
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;

    console.log(
      "This token is from Helper Function Decoded Token:",
      decodedToken
    );

    return decodedToken.id;

  } catch (err: any) {
    console.error("Error verifying token:", err.message);
    // You can handle specific error cases here, e.g. token expired, invalid token, etc.
    throw new Error(err.message || "Token verification failed");
  }
};
