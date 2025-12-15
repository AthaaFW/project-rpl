"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";


export const dynamic = "force-dynamic";

interface StaffForm {
  nik_staff: string;
  nama_staff: string;
  templa_staff: string;
  tglla_staff: string;
  goldar_staff: string;
  jk_staff: string;
  email_staff: string;
  password_staff: string;
  role_staff: string;
  status_staff: string;
}

export default function EditStaff() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [form, setForm] = useState<StaffForm>({
    nik_staff: "",
    nama_staff: "",
    templa_staff: "",
    tglla_staff: "",
    goldar_staff: "",
    jk_staff: "",
    email_staff: "",
    password_staff: "",
    role_staff: "",
    status_staff: "",
  });

  const update = <K extends keyof StaffForm>(key: K, value: StaffForm[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // 🔄 Ambil data staff berdasarkan ID
  const fetchStaff = async () => {
    if (!id) return;
    try {
      const res = await fetch(`/api/staff?id_staff=${id}`);
      const data = await res.json();

      if (res.ok) {
        setForm({
          nik_staff: data.nik_staff ?? "",
          nama_staff: data.nama_staff ?? "",
          templa_staff: data.templa_staff ?? "",
          tglla_staff: data.tglla_staff ?? "",
          goldar_staff: data.goldar_staff ?? "",
          jk_staff: data.jk_staff ?? "",
          email_staff: data.email_staff ?? "",
          password_staff: "", // leave empty for security
          role_staff: data.role_staff ?? "",
          status_staff: data.status_staff ?? "",
        });
      } else {
        console.error("Failed to fetch staff:", data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) fetchStaff();
  }, [id]);

  // 📤 Submit Update
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    try {
      const res = await fetch(`/api/staff?id_staff=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("API Result:", data);

      if (res.ok) router.push("/staff");
      else alert(data.message || "Terjadi kesalahan saat update");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat update");
    }
  };

  return (
    <div className="pl-72 pt-25">
      <Navbar />
      <Sidebar />
      <h1 className="text-2xl font-bold">Edit Data Staff</h1>

      <form onSubmit={handleSubmit}>
        <div className="max-w-2xl mx-auto mt-5 p-6 rounded-xl shadow border border-gray-300">

          {/* NIK (READONLY) */}
          <label className="block font-semibold mb-1">NIK Staff</label>
          <input
            type="text"
            className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-gray-100"
            value={form.nik_staff}
            readOnly
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
                className="w-full border border-gray-400 rounded px-3 py-2 bg-white mb-2"
                value={form.templa_staff}
                onChange={(e) => update("templa_staff", e.target.value)}
              />

              <input
                type="date"
                className="w-full border border-gray-400 rounded px-3 py-2 bg-white"
                value={form.tglla_staff}
                onChange={(e) => update("tglla_staff", e.target.value)}
              />
            </div>

            {/* Golongan Darah + Jenis Kelamin */}
            <div>
              <label className="block font-semibold mb-1">Golongan Darah</label>
              <input
                type="text"
                className="w-full border border-gray-400 rounded px-3 py-2 bg-white"
                value={form.goldar_staff}
                onChange={(e) => update("goldar_staff", e.target.value)}
              />

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

          {/* Email */}
          <label className="block font-semibold mt-4 mb-1">Email Staff</label>
          <input
            type="email"
            className="w-full border border-gray-400 rounded px-3 py-2 bg-white mb-4"
            value={form.email_staff}
            onChange={(e) => update("email_staff", e.target.value)}
            required
          />

          {/* Password */}
          <label className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-400 rounded px-3 py-2 bg-white mb-4"
            value={form.password_staff}
            onChange={(e) => update("password_staff", e.target.value)}
            placeholder="Isi jika ingin ganti"
          />

          {/* Role */}
          <label className="block font-semibold mb-1">Role</label>
          <select
            className="w-full border border-gray-400 rounded px-3 py-2 bg-white mb-4"
            value={form.role_staff}
            onChange={(e) => update("role_staff", e.target.value)}
            required
          >
            <option value="">-- Pilih Role --</option>
            <option value="Dokter">Dokter</option>
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
          </select>

          {/* Status */}
          <label className="block font-semibold mb-1">Status</label>
          <select
            className="w-full border border-gray-400 rounded px-3 py-2 bg-white"
            value={form.status_staff}
            onChange={(e) => update("status_staff", e.target.value)}
            required
          >
            <option value="Aktif">Aktif</option>
            <option value="Nonaktif">Nonaktif</option>
          </select>

          {/* Tombol */}
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
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
