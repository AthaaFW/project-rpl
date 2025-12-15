"use client";

import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";
import { useState } from "react";
import Link from "next/link";
import React from "react";

export default function Home() {
  const [form, setForm] = useState({
    nama_ruangan: "",
    kelas_ruangan: "",
    kapasitas: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/ruangan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      // ❌ Duplicate atau error lain
      alert(data.message || data.error || "Terjadi kesalahan");
      return;
    }
    console.log("Response API:", data);

    // redirect setelah submit
    window.location.href = "/ruangan";
  };

  return (
    <div className="pl-72 pt-25">
      <Navbar />
      <Sidebar />
      
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Tambah Ruangan</h1>

        {/* Nama Ruangan */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Nama Ruangan</label>
          <input
            type="text"
            value={form.nama_ruangan}
            onChange={(e) =>
              setForm({ ...form, nama_ruangan: e.target.value })
            }
            placeholder="Ruang 1A"
            className="border rounded-md p-2 focus:ring-2 focus:ring-green-nav outline-none"
            required
          />
        </div>

        {/* Kelas Ruangan */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Kelas Ruangan</label>
          <select
            value={form.kelas_ruangan}
            onChange={(e) =>
              setForm({ ...form, kelas_ruangan: e.target.value })
            }
            className="w-full border border-gray-400 rounded px-3 py-2 bg-white"
            required
          >
            <option value="">-- Pilih Kelas Ruangan --</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        {/* Kapasitas */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Kapasitas</label>
          <input
            type="number"
            value={form.kapasitas}
            onChange={(e) =>
              setForm({ ...form, kapasitas: e.target.value })
            }
            placeholder="2-8"
            className="border rounded-md p-2 focus:ring-2 focus:ring-green-nav outline-none"
            min={1}
            required
          />
        </div>

        {/* Tombol Submit */}
        <div className="w-full flex flex-row gap-2">
          <Link
            href="/ruangan"
            className="text-center w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold transition"
          >
            Cancel
          </Link>
          
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold transition"
          >
            Tambahkan
          </button>
        </div>

      </form>
    </div>
  );
}
