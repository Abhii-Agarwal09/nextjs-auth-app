import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import { User } from "@/models";

export async function sendMail({ email, emailType, userId }: any) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    // create transporter
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4427085ae27c0f",
        pass: "31308a6ebee692",
      },
    });

    const mailFields = {
      routeText: emailType === "VERIFY" ? "verifyEmail" : "resetPassword",
      btnText: emailType === "VERIFY" ? "Verify email" : "Reset password",
    };

    const mailOptions = {
      from: "agarwalabhishek321@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify email" : "Reset password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${mailFields.routeText}?token=${hashedToken}">Here</a> to ${mailFields.btnText}</p>`,
    };
    const mail = transporter.sendMail(mailOptions);
    return mail;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
