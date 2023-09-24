"use client";
import axios from "axios";
import React, { useEffect } from "react";

const VerifyEmailPage = ({ searchParams }: any) => {
  console.log(searchParams);
  const token = searchParams.token;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        console.log("Verifying this token: ", token);
        const res = await axios.post("/api/users/verifyEmail", { token });
        console.log(res);
      } catch (error: any) {
        console.log(error);
      }
    };
    verifyToken();
  }, [token]);
  return <div>VerifyEmailPage</div>;
};

export default VerifyEmailPage;
