"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface StaffForm {
  nik_staff: string;
  nama_staff: string;
  templa_staff: string;
  tglla_staff: string;
  goldar_staff: string;
  jk_staff: string;
  alamat_staff: string;
  email_staff: string;
  password_staff: string;
  role_staff: string;
}

export default function AddStaff() {
  const router = useRouter();

  const [form, setForm] = useState<StaffForm>({
    nik_staff: "",
    nama_staff: "",
    templa_staff: "",
    tglla_staff: "",
    goldar_staff: "",
    jk_staff: "",
    alamat_staff: "",
    email_staff: "",
    password_staff: "",
    role_staff: "",
  });

  const update = <K extends keyof StaffForm>(key: K, value: StaffForm[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // 🔍 Auto-fill data berdasarkan NIK
  const handleNIKBlur = async () => {
    const nik = form.nik_staff.trim();
    if (!nik) return;

    try {
      const res = await fetch(`/api/pasien/add?nik=${nik}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Terjadi kesalahan saat update");
        return;
      }

      setForm(prev => ({
        ...prev,
        nama_staff: data.nama ?? "",
        templa_staff: data.tempatLahir ?? "",
        tglla_staff: data.tglLahir ?? "",
        jk_staff: data.jenisKelamin ?? "",
        goldar_staff: data.golDarah ?? "",
        alamat_staff: data.alamat ?? "",
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // 📤 Submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Response API:", data);

      if (res.ok) router.push("/staff");
      else alert(data.message || "Terjadi kesalahan saat submit");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat submit");
    }
  };

  return (
    <div className="pl-72 pt-25">
      <Navbar />
      <Sidebar />
      <h1 className="text-2xl font-bold">Tambah Staff</h1>

      <form onSubmit={handleSubmit}>
        <div className="max-w-2xl mx-auto mt-5 p-6 rounded-xl shadow border border-gray-300">

          {/* NIK */}
          <label className="block font-semibold mb-1">NIK Staff</label>
          <input
            type="text"
            className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-white"
            placeholder="Masukkan NIK"
            value={form.nik_staff}
            onChange={(e) => update("nik_staff", e.target.value)}
            onBlur={handleNIKBlur}
            required
          />

          {/* Nama */}
          <label className="block font-semibold mb-1">Nama Staff</label>
          <input
            type="text"
            className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-white"
            value={form.nama_staff}
            onChange={(e) => update("nama_staff", e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Tempat & Tanggal Lahir */}
            <div>
              <label className="block font-semibold mb-1">Tempat Lahir</label>
              <input
                type="text"
                className="w-full border border-gray-400 rounded px-3 py-2 mb-2"
                value={form.templa_staff}
                onChange={(e) => update("templa_staff", e.target.value)}
              />

              <input
                type="date"
                className="w-full border border-gray-400 rounded px-3 py-2"
                value={form.tglla_staff}
                onChange={(e) => update("tglla_staff", e.target.value)}
              />
            </div>

            {/* Golongan Darah & Jenis Kelamin */}
            <div>
              <label className="block font-semibold mb-1">Golongan Darah</label>
              <select
                className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-white"
                value={form.goldar_staff}
                onChange={(e) => update("goldar_staff", e.target.value)}
              >
                <option value="">-- Pilih Golongan Darah --</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
        
              <label className="block font-semibold mt-3 mb-1">Jenis Kelamin</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="jk"
                    checked={form.jk_staff === "Laki-laki"}
                    onChange={() => update("jk_staff", "Laki-laki")}
                  />
                  <span>Laki-laki</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="jk"
                    checked={form.jk_staff === "Perempuan"}
                    onChange={() => update("jk_staff", "Perempuan")}
                  />
                  <span>Perempuan</span>
                </label>
              </div>
            </div>
          </div>

          {/* Alamat */}
          <label className="block font-semibold mb-1 mt-4">Alamat Staff</label>
          <textarea
            className="w-full mb-4 border border-gray-400 rounded px-3 py-2"
            rows={3}
            placeholder="Masukkan alamat lengkap"
            value={form.alamat_staff}
            onChange={(e) => update("alamat_staff", e.target.value)}
            required
          />

          {/* Email */}
          <label className="block font-semibold mt-4 mb-1">Email Staff</label>
          <input
            type="email"
            className="w-full border border-gray-400 rounded px-3 py-2 mb-4"
            placeholder="email@gmail.com"
            value={form.email_staff}
            onChange={(e) => update("email_staff", e.target.value)}
            required
          />

          {/* Password */}
          <label className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-400 rounded px-3 py-2 mb-4"
            value={form.password_staff}
            onChange={(e) => update("password_staff", e.target.value)}
            required
          />

          {/* Role */}
          <label className="block font-semibold mb-1">Role</label>
          <select
            className="w-full border border-gray-400 rounded px-3 py-2 mb-4"
            value={form.role_staff}
            onChange={(e) => update("role_staff", e.target.value)}
            required
          >
            <option value="">-- Pilih Role --</option>
            <option value="Dokter">Dokter</option>
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Link
              href="/staff"
              className="bg-red-700 text-white px-5 py-2 rounded-lg shadow"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-green-700 text-white px-5 py-2 rounded-lg shadow"
            >
              Submit
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
