"use client";
import { performLogin } from "@/app/actions";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const router = useRouter();
  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const found = await performLogin(formData);

      if (found) {
        setAuth(found);
        router.push("/");
      } else {
        setError("Please provide a valid login credential");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="my-2 text-red-500">{error}</div>
      <form id="loginForm" className="space-y-4" onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email or phone number"
          className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
          required
        />
        <button
          type="submit"
          className={`w-full bg-moviedb-red text-white py-3 rounded transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Sign In"}
        </button>
      </form>
    </>
  );
}
