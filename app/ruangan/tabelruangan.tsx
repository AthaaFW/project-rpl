"use client";

import { Pencil, Trash } from "lucide-react";

export default function TabelRuangan() {
  const data = [
    { idRuangan: 1, nama: "Ruang 1A", tersedia: "Tersedia", kapasitas: "2/4" },
    { idRuangan: 2, nama: "Ruang 2A", tersedia: "Penuh", kapasitas: "4/4" },
    { idRuangan: 3, nama: "Ruang 1B", tersedia: "Tersedia", kapasitas: "0/1" },
    { idRuangan: 4, nama: "Ruang 2B", tersedia: "Penuh", kapasitas: "1/1" },
  ];

  function handleEdit(id: number) {
    console.log("Edit ruangan dengan ID:", id);
    // Arahkan ke form edit, atau munculkan modal
  }

  function handleDelete(id: number) {
    console.log("Hapus ruangan dengan ID:", id);
    // Tambahkan konfirmasi atau fetch ke API later
  }

  return (
    <div className="p-5">
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-green-nav text-white">
          <tr>
            <th className="p-3 text-left">ID Ruangan</th>
            <th className="p-3 text-left">Nama Ruangan</th>
            <th className="p-3 text-left">Ketersediaan</th>
            <th className="p-3 text-left">Kapasitas</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((ruangan) => (
            <tr key={ruangan.idRuangan} className="border-b hover:bg-green-50 transition">
              <td className="p-3">{ruangan.idRuangan}</td>
              <td className="p-3">{ruangan.nama}</td>
              <td className={`p-3 font-semibold 
              ${ruangan.tersedia == "Penuh" ? 
              "text-red-600" : "text-green-600"}`}>
                {ruangan.tersedia}</td>
              <td className="p-3">{ruangan.kapasitas}</td>

              {/* Tombol Aksi */}
              <td className="p-3 flex gap-3">
                <button
                  onClick={() => handleEdit(ruangan.idRuangan)}
                  className="px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow"
                >
                  <Pencil size="17px"/>
                </button>

                <button
                  onClick={() => handleDelete(ruangan.idRuangan)}
                  className="px-3 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md shadow"
                >
                  <Trash size="17px"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
