import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("Request body", reqBody);
    const { token } = reqBody;
    console.log("Token: ", token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Email not verified",
      });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({ success: true, message: "Email verified" });
  } catch (error: any) {
    return NextResponse.json({ sucess: false, error: error.message });
  }
}
