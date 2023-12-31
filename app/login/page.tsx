"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      const res = await axios.post("/api/users/login", user);
      console.log(res);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const inputChangeHandler = (e: any) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="container">
      <h1 className="heading">Login</h1>
      <div className="input-container">
        <label htmlFor="email">Email</label>
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={user.email}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={user.password}
          onChange={inputChangeHandler}
        />
      </div>
      <button onClick={onLogin} className="btn mt-4">
        Login
      </button>
      <Link href="/signup" className="mt-4">
        Back to Signup
      </Link>
    </div>
  );
};

export default LoginPage;
