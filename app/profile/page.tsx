"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const [id, setId] = useState("");

  useEffect(() => {
    const getDetails = async () => {
      const res = await axios.get("/api/users/me");
      console.log(res);
      setId(res.data.data._id);
    };
    getDetails();
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      console.log(res);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Profile</h1>
      <h2 className="p-2 my-4 rounded-lg bg-orange-500">
        {id ? <Link href={`/profile/${id}`}>{id}</Link> : "Id not present"}
      </h2>
      <div>
        <button className="btn" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
