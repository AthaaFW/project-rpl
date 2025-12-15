"use client";

import Image from "next/image";
import bg from "@/images/doodad.png";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: { message?: string } = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Login gagal");
        return;
      }

      // Login berhasil → redirect
      router.push("/intro");
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Terjadi kesalahan saat login.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">

      <div
        className="absolute inset-0 bg-repeat z-[-1] opacity-30"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: "auto",
        }}
      />

      <div className="flex justify-center mb-4">
        {/* LOGO */}
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path d="M0 20C0 12.5231 0 8.78461 1.60769 6C2.66091 4.17577 4.17577..." fill="#00DC33"></path>
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 leading-snug mb-8">
        Welcome Back!
      </h1>

      {/* CARD */}
      <div className="relative z-10 bg-white/30 backdrop-blur-lg border border-gray-200 rounded-3xl px-12 py-10 shadow-xl w-[400px] text-center">

        {/* FORM LOGIN */}
        <form className="flex flex-col gap-5" onSubmit={handleLogin}>

          {/* Email */}
          <div className="flex flex-col text-left">
            <label className="text-gray-700 text-sm mb-2">Email</label>
            <input
              type="email"
              className="bg-white px-4 py-1 rounded-md outline-none border border-gray-500"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col text-left">
            <label className="text-gray-700 text-sm mb-2">Password</label>
            <input
              type="password"
              className="bg-white px-4 py-1 rounded-md outline-none border border-gray-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* ERROR MESSAGE */}
          {errorMsg && (
            <p className="text-red-600 text-sm text-left">{errorMsg}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-green-nav text-white py-2 rounded-md hover:opacity-70 font-bold transition"
          >
            Sign in
          </button>
        </form>

        <div className="mt-4">
          <a href="#" className="text-sm underline text-gray-700 hover:text-gray-900">
            Forgot password?
          </a>
        </div>

      </div>
    </div>
  );
}
