"use client";
import React, { useContext, useState } from "react";
const base_url = process.env.BASE_URL || "http://localhost:4242/api/v1";
import { AuthContext } from "@/context/(companyAuth)/AuthContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SignIn = () => {
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    setError(null);

    try {
      const response = await fetch(`${base_url}/auth/login/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        // credentials: "include", // Include cookies in the request
      });

      const result = await response.json();
      console.log("the result", result);

      if (response.ok) {
        // Store token in a cookie (consider using a more secure approach like HttpOnly cookies for sensitive information)
        Cookies.set("accessToken", result.token, { path: "/" }); // Make the cookie accessible to the entire app
        dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
        console.log("result:", result.token);
        router.push("/dashboard");
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="border border-gray-300 p-14 rounded-xl bg-white shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Sign In
        </h2>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-md font-medium text-gray-700"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email" // Add the name attribute for inputs
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="email@example.com"
              required
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-md font-medium text-gray-700"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password" // Add the name attribute for inputs
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              required
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="p-3 w-full bg-[#ffde59] rounded-md text-gray-800 hover:bg-[#ffcf10] transition duration-200"
          >
            Submit
          </button>
          <h1 className="flex items-center justify-center text-md text-gray-500 mt-4">
            Lite Ticket LLC
          </h1>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
