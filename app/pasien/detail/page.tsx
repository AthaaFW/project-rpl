"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function EditPasien() {

  const searchParams = useSearchParams();
  const nik_pasien = searchParams.get("nik_pasien");

  const [form, setForm] = useState({
    nik_pasien: "",
    nama_pasien: "",
    alamat_pasien: "",
    templa_pasien: "",
    tglla_pasien: "",
    jk_pasien: "",
    goldar_pasien: "",
    bpjs_pasien: "",
    penanganan_pasien: ""
  });

  const [disabled, setDisabled] = useState(true); // ⬅ default non-editable

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 🔥 Ambil data pasien berdasarkan NIK
  useEffect(() => {
    if (!nik_pasien) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/pasien/edit?nik_pasien=${nik_pasien}`);
        const data = await res.json();

        setForm(data);  // ⬅ isi form otomatis
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [nik_pasien]);

  // 🔥 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/pasien/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("UPDATE RESULT:", data);

    alert("Data pasien berhasil diperbarui!");

    setDisabled(true); // ⬅ disable kembali setelah save
  };

  return (
    <div className="pl-72 pt-25">
      <Navbar />
      <Sidebar />
      <h1 className="text-2xl font-bold mb-5">Edit Data Pasien</h1>

      <form onSubmit={handleSubmit}>
        <div className="max-w-2xl mx-auto mt-5 p-6 rounded-xl shadow border border-gray-300">

          {/* NIK */}
          <label className="block font-semibold mb-1">NIK</label>
          <input
            type="text"
            className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-gray-100"
            value={form.nik_pasien}
            disabled
          />

          {/* Nama */}
          <label className="block font-semibold mb-1">Nama Lengkap</label>
          <input
            type="text"
            className="w-full mb-4 border border-gray-400 rounded px-3 py-2"
            disabled={disabled}
            value={form.nama_pasien}
            onChange={(e) => update("nama_pasien", e.target.value)}
          />

          {/* Grid 2 kolom */}
          <div className="grid grid-cols-2 gap-4">

            {/* Alamat */}
            <div>
              <label className="block font-semibold mb-1">Alamat</label>
              <textarea
                className="w-full h-[90px] border border-gray-400 rounded px-3 py-2 resize-none"
                disabled={disabled}
                value={form.alamat_pasien}
                onChange={(e) => update("alamat_pasien", e.target.value)}
              />
            </div>

            {/* Tempat / Tgl lahir */}
            <div>
              <label className="block font-semibold mb-1">Tempat/Tgl Lahir</label>

              <input
                type="text"
                className="w-full mb-2 border border-gray-400 rounded px-3 py-2"
                disabled={disabled}
                value={form.templa_pasien}
                onChange={(e) => update("templa_pasien", e.target.value)}
              />

              <input
                type="date"
                className="w-full border border-gray-400 rounded px-3 py-2"
                disabled={disabled}
                value={form.tglla_pasien}
                onChange={(e) => update("tglla_pasien", e.target.value)}
              />
            </div>

          </div>

          {/* Grid 2 kolom */}
          <div className="grid grid-cols-2 gap-4 mt-4">

            {/* Jenis kelamin */}
            <div>
              <label className="block font-semibold mb-1">Jenis Kelamin</label>
              <div className="flex items-center gap-4">

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="jk"
                    disabled={disabled}
                    checked={form.jk_pasien === "Laki-laki"}
                    onChange={() => update("jk_pasien", "Laki-laki")}
                  />
                  <span>Laki-laki</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="jk"
                    disabled={disabled}
                    checked={form.jk_pasien === "Perempuan"}
                    onChange={() => update("jk_pasien", "Perempuan")}
                  />
                  <span>Perempuan</span>
                </label>

              </div>
            </div>

            {/* Gol Darah */}
            <div>
              <label className="block font-semibold mb-1">Gol. Darah</label>
              <input
                type="text"
                className="w-full border border-gray-400 rounded px-3 py-2"
                disabled={disabled}
                value={form.goldar_pasien}
                onChange={(e) => update("goldar_pasien", e.target.value)}
              />
            </div>

          </div>

          {/* BPJS + Penanganan */}
          <div className="flex flex-row min-w-full gap-10 justify-between items-center">
            <div className="w-[49%]">
              <label className="block font-semibold mb-1">Kelas Ruangan</label>
              <select
                className="w-full border border-gray-400 rounded px-3 py-2"
                disabled={disabled}
                value={form.bpjs_pasien}
                onChange={(e) => update("bpjs_pasien", e.target.value)}
              >
                <option value="">-- Pilih Kelas BPJS --</option>
                <option value="-">Tidak Punya</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 mt-6">

            <Link href="/pasien" className="bg-red-700 text-white px-5 py-2 rounded-lg shadow">
              Cancel
            </Link>

            {/* Tombol Edit / Save */}
            {disabled ? (
              <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    setDisabled(false);
                }}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
              >
                Edit
              </button>
            ) : (
              <button className="bg-green-700 text-white px-5 py-2 rounded-lg shadow">
                Save
              </button>
            )}
          </div>
          </div>

          {/* Tombol */}
          

        </div>
      </form>

    </div>
  );
}
