"use client";

import { useState } from "react";
import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";


export const dynamic = "force-dynamic";

interface FormType {
  nik_pasien: string;
  nama_pasien: string;
  alamat_pasien: string;
  templa_pasien: string;
  tglla_pasien: string;
  jk_pasien: string;
  goldar_pasien: string;
  bpjs_pasien: string;
  penanganan_pasien: string;
}

export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState<FormType>({
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

  const update = <K extends keyof FormType>(key: K, value: FormType[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleNIKBlur = async () => {
    if (!form.nik_pasien.trim()) return;

    try {
      const res = await fetch(`/api/pasien/add?nik=${form.nik_pasien}`);
      const data = await res.json();

      if (res.ok) {
        setForm(prev => ({
          ...prev,
          nama_pasien: data.nama,
          alamat_pasien: data.alamat,
          templa_pasien: data.tempatLahir,
          tglla_pasien: data.tglLahir,
          jk_pasien: data.jenisKelamin,
          goldar_pasien: data.golDarah,
          bpjs_pasien: data.bpjs
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/pasien/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        // ❌ Duplicate atau error lain
        alert(data.message || data.error || "Terjadi kesalahan");
        return;
      }

      console.log("Response API:", data);
      router.push("/pasien");

    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat submit form");
    }
  };

  return (
    <div className="pl-72 pt-25">
      <Navbar />
      <Sidebar />
      <h1 className="text-2xl font-bold">Pasien</h1>

      <form onSubmit={handleSubmit}>
        <div className="max-w-2xl mx-auto mt-5 p-6 rounded-xl shadow border border-gray-300">

          {/* NIK */}
          <label className="block font-semibold mb-1">NIK</label>
          <input
            type="text"
            placeholder="1234567890123456"
            className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-white"
            value={form.nik_pasien}
            onChange={(e) => update("nik_pasien", e.target.value)}
            onBlur={handleNIKBlur}
          />

          {/* Nama Lengkap */}
          <label className="block font-semibold mb-1">Nama Lengkap</label>
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-white"
            value={form.nama_pasien}
            onChange={(e) => update("nama_pasien", e.target.value)}
          />

          {/* Alamat */}
          <label className="block font-semibold mb-1">Alamat</label>
          <textarea
            placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota, Provinsi, Kode Pos"
            className="w-full h-[90px] border border-gray-400 rounded px-3 py-2 bg-white resize-none mb-4"
            value={form.alamat_pasien}
            onChange={(e) => update("alamat_pasien", e.target.value)}
          />

          {/* Tempat/Tanggal Lahir */}
          <label className="block font-semibold mb-1">Tempat/Tgl Lahir</label>
          <input
            type="text"
            placeholder="Kota"
            className="w-full mb-2 border border-gray-400 rounded px-3 py-2 bg-white"
            value={form.templa_pasien}
            onChange={(e) => update("templa_pasien", e.target.value)}
          />
          <input
            type="date"
            className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-white"
            value={form.tglla_pasien}
            onChange={(e) => update("tglla_pasien", e.target.value)}
          />

          {/* Jenis Kelamin */}
          <label className="block font-semibold mb-1">Jenis Kelamin</label>
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="jk"
                checked={form.jk_pasien === "Laki-laki"}
                onChange={() => update("jk_pasien", "Laki-laki")}
              />
              <span>Laki-laki</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="jk"
                checked={form.jk_pasien === "Perempuan"}
                onChange={() => update("jk_pasien", "Perempuan")}
              />
              <span>Perempuan</span>
            </label>
          </div>

          {/* Golongan Darah */}
          <label className="block font-semibold mb-1">Gol. Darah</label>
          <select
            className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-white"
            value={form.goldar_pasien}
            onChange={(e) => update("goldar_pasien", e.target.value)}
          >
            <option value="">-- Pilih Golongan Darah --</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>
  
          {/* Penanganan */}
          <label className="block font-semibold mb-1">Penanganan</label>
          <select
            className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-white"
            value={form.penanganan_pasien}
            onChange={(e) => update("penanganan_pasien", e.target.value)}
          >
            <option value="">-- Pilih Penanganan --</option>
            <option value="S-2025120813">Gawat Darurat</option>
            <option value="S-25120713">Poliklinik</option>
          </select>

          {/* BPJS */}
          <label className="block font-semibold mb-1">BPJS</label>
          <select
            className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-white"
            value={form.bpjs_pasien}
            onChange={(e) => update("bpjs_pasien", e.target.value)}
          >
            <option value="">-- Pilih Kelas BPJS --</option>
            <option value="-">Tidak Punya</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          {/* Tombol */}
          <div className="flex justify-end gap-4">
            <Link href="/pasien" className="bg-red-700 text-white px-5 py-2 rounded-lg shadow">
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
