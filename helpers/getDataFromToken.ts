import { NextRequest } from "next/server";
import { User } from "@/models";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface UserTokenData extends JwtPayload {
  id: string;
  username?: string;
  email?: string;
}

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as UserTokenData;
    console.log("Decoded Token: ", decodedToken);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
