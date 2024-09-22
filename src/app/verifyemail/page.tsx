"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gradient-to-r from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-700">
      <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Verify Email
      </h1>

      <h2 className="p-2 text-lg font-mono text-gray-900 bg-yellow-200 dark:bg-yellow-600 rounded-lg mb-6">
        {token ? `Token: ${token}` : "No token provided"}
      </h2>

      {verified && (
        <div className="bg-green-100 dark:bg-green-700 text-green-900 dark:text-green-200 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Email Verified Successfully!
          </h2>
          <Link href="/login">
            <a className="text-lg font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
              Go to Login
            </a>
          </Link>
        </div>
      )}

      {error && (
        <div className="bg-red-100 dark:bg-red-700 text-red-900 dark:text-red-200 p-4 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-semibold">Error Verifying Email</h2>
          <p className="mt-2">
            There was a problem verifying your email. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
}
