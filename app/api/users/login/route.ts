import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/config";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    // check if user already exists
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User does not exist.",
      });
    }

    // check password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        success: false,
        message: "Email or password is incorrect.",
      });
    }

    // create token data
    const tokenData = { id: user._id, email: user.email };
    // create token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const res = NextResponse.json({
      sucess: true,
      message: "User logged in",
    });
    res.cookies.set("token", token, { httpOnly: true });
    return res;
  } catch (error: any) {
    console.log("There is some error: ", error);
    return NextResponse.json({ error: error.message });
  }
}
