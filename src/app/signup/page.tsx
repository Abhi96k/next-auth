"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
      <h1 className="text-3xl font-bold text-primary mb-6">
        {loading ? "Processing..." : "Signup"}
      </h1>
      <hr className="w-1/2 mb-4 border-gray-300" />
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <label
          htmlFor="username"
          className="block text-gray-700 dark:text-gray-300 mb-2"
        >
          Username
        </label>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
        />

        <label
          htmlFor="email"
          className="block text-gray-700 dark:text-gray-300 mb-2"
        >
          Email
        </label>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />

        <label
          htmlFor="password"
          className="block text-gray-700 dark:text-gray-300 mb-2"
        >
          Password
        </label>
        <input
          className="w-full p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />

        <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className={`w-full py-2 px-4 mb-4 text-white rounded-lg transition-all ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-hover"
          }`}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <Link href="/login" className="text-sm text-secondary hover:underline">
          Already have an account? Log in here
        </Link>
      </div>
    </div>
  );
}
