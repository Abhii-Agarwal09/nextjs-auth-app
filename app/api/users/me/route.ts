import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers";
import { User } from "@/models";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log("User id: ", userId);
    const user = await User.findById(userId).select("-password");
    console.log(user);
    return NextResponse.json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
