"use client";

import { useState } from "react";
import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddStaff() {
    const router = useRouter();

    const [form, setForm] = useState({
        nik_staff: "",
        nama_staff: "",
        templa_staff: "",
        tglla_staff: "",
        goldar_staff: "",
        jk_staff: "",
        alamat_staff:"",
        email_staff: "",
        password_staff: "",
        role_staff: "",
    });

    const update = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    // 🔍 Auto-fill data berdasarkan NIK
    const handleNIKBlur = async () => {
        if (!form.nik_staff.trim()) return;

        try {
            const res = await fetch(`/api/pasien/add?nik=${form.nik_staff}`);
            const data = await res.json();

            if (!res.ok) {
                // jika API mengembalikan error / duplikat
                alert(data.message || "Terjadi kesalahan saat update");
                return;
              }

            if (res.ok) {
                setForm(prev => ({
                    ...prev,
                    nama_staff: data.nama,
                    templa_staff: data.tempatLahir,
                    tglla_staff: data.tglLahir,
                    jk_staff: data.jenisKelamin,
                    goldar_staff: data.golDarah,
                    alamat_staff: data.alamat
                }));
            }
        } catch (err) {
            console.log(err);
        }
    };

    // 📤 Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/staff", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();
        console.log("Response API:", data);

        router.push("/staff");
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

                        {/* Tempat Lahir */}
                        <div>
                            <label className="block font-semibold mb-1">Tempat Lahir</label>
                            <input
                                type="text"
                                className="w-full border border-gray-400 rounded px-3 py-2 bg-white mb-2"
                                value={form.templa_staff}
                                onChange={(e) => update("templa_staff", e.target.value)}
                            />

                            {/* Tanggal Lahir */}
                            <input
                                type="date"
                                className="w-full border border-gray-400 rounded px-3 py-2 bg-white"
                                value={form.tglla_staff}
                                onChange={(e) => update("tglla_staff", e.target.value)}
                            />
                        </div>

                        {/* Golongan Darah */}
                        <div>
                            <label className="block font-semibold mb-1">Golongan Darah</label>
                            <input
                                type="text"
                                className="w-full border border-gray-400 rounded px-3 py-2 bg-white"
                                value={form.goldar_staff}
                                onChange={(e) => update("goldar_staff", e.target.value)}
                            />

                            {/* Jenis Kelamin */}
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
                    <label className="block font-semibold mb-1">Alamat Staff</label>
                    <textarea
                        className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-white"
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
                        className="w-full border border-gray-400 rounded px-3 py-2 bg-white mb-4"
                        placeholder="email@gmail.com"
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
                        required
                    />

                    {/* Role */}
                    <label className="block font-semibold mb-1">Role</label>
                    <select
                        className="w-full border border-gray-400 rounded px-3 py-2 bg-white"
                        value={form.role_staff}
                        onChange={(e) => update("role_staff", e.target.value)}
                        required
                    >
                        <option value="">-- Pilih Role --</option>
                        <option value="Dokter">Dokter</option>
                        <option value="Staff">Staff</option>
                        <option value="Admin">Admin</option>
                    </select>

                    {/* Tombol */}
                    <div className="flex justify-end gap-4 mt-6">
                        <Link href="/staff" className="bg-red-700 text-white px-5 py-2 rounded-lg shadow">
                            Cancel
                        </Link>
                        <button className="bg-green-700 text-white px-5 py-2 rounded-lg shadow">
                            Submit
                        </button>
                    </div>

                </div>
            </form>

        </div>
    );
}
