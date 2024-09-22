"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <h1 className="text-4xl font-bold mb-6">Profile Page</h1>
      <hr className="w-full max-w-md mb-6 border-white" />

      <h2 className="p-4 rounded-lg bg-white text-black text-2xl mb-4">
        {data === "nothing" ? (
          "No data yet!"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr className="w-full max-w-md mb-6 border-white" />

      <div className="flex space-x-4">
        <button
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        >
          Logout
        </button>

        <button
          onClick={getUserDetails}
          className="bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        >
          Get User Details
        </button>
      </div>
    </div>
  );
}
