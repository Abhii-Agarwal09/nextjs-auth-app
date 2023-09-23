"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUpPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSignUp = async () => {
    try {
      const res = await axios.post("/api/users/signup", user);
      console.log(res);
      router.push("/login");
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
      <h1 className="heading">Signup</h1>
      <div className="input-container">
        <label htmlFor="username">Username</label>
        <input
          className="input"
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          value={user.username}
          onChange={inputChangeHandler}
        />
      </div>
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
      <button onClick={onSignUp} className="btn mt-4">
        Signup
      </button>
      <Link href="/login" className="mt-4">
        Back to Login
      </Link>
    </div>
  );
};

export default SignUpPage;
