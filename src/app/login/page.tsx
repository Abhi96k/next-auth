"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-300 via-blue-200 to-indigo-300 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {loading ? "Processing..." : "Login"}
      </h1>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <hr className="mb-4 border-gray-300 dark:border-gray-600" />
        <label htmlFor="email" className="text-gray-700 dark:text-gray-200">
          Email
        </label>
        <input
          className="p-2 w-full border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <label htmlFor="password" className="text-gray-700 dark:text-gray-200">
          Password
        </label>
        <input
          className="p-2 w-full border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          onClick={onLogin}
          disabled={buttonDisabled}
          className={`w-full py-2 mb-4 text-white rounded-lg ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          }`}
        >
          Login Here
        </button>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
