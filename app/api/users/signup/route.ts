import bcryptjs from "bcryptjs";
import { connect } from "@/config";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    const { username, email, password } = reqBody;

    // find if the user exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    }
    // hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
