"use client";

import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";
import { useState } from "react";
import Link from "next/link";

export default function Home() {

    const [nama, setNama] = useState("");
    const [kapasitas, setKapasitas] = useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      const data = {
        namaRuangan: nama,
        kapasitas: Number(kapasitas),
      };
  
      console.log("Data ruangan baru:", data);
      alert("Ruangan berhasil ditambahkan!");
  
      // Reset input
      setNama("");
      setKapasitas("");
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
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Ruang 1A"
          className="border rounded-md p-2 focus:ring-2 focus:ring-green-nav outline-none"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold">Kelas Ruangan</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="A/B"
          className="border rounded-md p-2 focus:ring-2 focus:ring-green-nav outline-none"
          required
        />
      </div>

      {/* Kapasitas */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold">Kapasitas</label>
        <input
          type="number"
          value={kapasitas}
          onChange={(e) => setKapasitas(e.target.value)}
          placeholder="1-4"
          className="border rounded-md p-2 focus:ring-2 focus:ring-green-nav outline-none"
          min={1}
          required
        />
      </div>

      {/* Tombol Submit */}
      <div className="w-full flex flex-row gap-2">
      <Link href="/ruangan"
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
