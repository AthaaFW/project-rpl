"use client";

import { Pencil, Trash, Save } from "lucide-react";
import { useEffect, useState } from "react";

export default function TabelRuangan() {
  const [data, setData] = useState<any[]>([]);
  const [editedRow, setEditedRow] = useState<any | null>(null);

  const getRuangan = () => {
    fetch(`/api/ruangan`)
      .then((res) => res.json())
      .then((result) => {
        console.log("Data JSON:", JSON.stringify(result, null, 2));
        setData(result);
      });
  };

  useEffect(() => {
    getRuangan();
  }, []);

  const startEdit = (ruangan: any) => {
    setEditedRow({
      id_ruangan: ruangan.id_ruangan,
      nama_ruangan: ruangan.nama_ruangan,
      kelas_ruangan: ruangan.kelas_ruangan,
      kapasitas: ruangan.kapasitas
    });
  };

  const saveEdit = async () => {
    if (!editedRow) return;
    if(editedRow.isi_ruangan != 0) return console.log("Pastikan ruangan kosong sebelum edit");

    await fetch(`/api/ruangan?id_ruangan=${editedRow.id_ruangan}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedRow),
    });
    getRuangan(); // refresh data
  };

  const deleteRuangan =  async(id: String, isi_ruangan: number)=>{
    if (!id) return;
    if(isi_ruangan != 0) return console.log("Pastikan ruangan kosong sebelum edit");

    await fetch(`/api/ruangan?id_ruangan=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedRow),
    });    
    getRuangan();
  }

  return (
    <div className="p-5">
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-green-nav text-white">
          <tr>
            <th className="p-3 text-left">ID Ruangan</th>
            <th className="p-3 text-left">Nama Ruangan</th>
            <th className="p-3 text-left">Kelas Ruangan</th>
            <th className="p-3 text-left">Ketersediaan</th>
            <th className="p-3 text-left">Kapasitas</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((ruangan) => {
            const isEditing =
              editedRow && editedRow.id_ruangan === ruangan.id_ruangan;

            return (
              <tr key={ruangan.id_ruangan} className="border-b hover:bg-green-50 transition">
                <td className="p-3">{ruangan.id_ruangan}</td>

                {/* Nama Ruangan */}
                <td className="p-3">
                  {isEditing ? (
                    <input
                      type="text"
                      className="border p-1 rounded"
                      value={editedRow.nama_ruangan}
                      onChange={(e) =>
                        setEditedRow({ ...editedRow, nama_ruangan: e.target.value })
                      }
                    />
                  ) : (
                    ruangan.nama_ruangan
                  )}
                </td>

                {/* Kelas Ruangan */}
                <td className="p-3">
                  {isEditing ? (
                    <select
                      className="border p-1 rounded"
                      value={editedRow.kelas_ruangan}
                      onChange={(e) =>
                        setEditedRow({ ...editedRow, kelas_ruangan: e.target.value })
                      }>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  ) : (
                    ruangan.kelas_ruangan
                  )}
                </td>

                {/* Ketersediaan */}
                <td
                  className={`p-3 font-semibold ${
                    ruangan.ketersediaan_ruangan === "Penuh"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {ruangan.ketersediaan_ruangan}
                </td>

                {/* Kapasitas */}
                <td className="p-3">
                  {isEditing ? (
                    <input
                      type="number"
                      className="border p-1 rounded w-20"
                      value={editedRow.kapasitas}
                      onChange={(e) =>
                        setEditedRow({ ...editedRow, kapasitas: e.target.value })
                      }
                    />
                  ) : (
                    `${ruangan.isi_ruangan}/${ruangan.kapasitas}`
                  )}
                </td>

                {/* Tombol Aksi */}
                <td className="p-3 flex gap-3">
                  {isEditing ? (
                    <button
                      onClick={()=>{
                        saveEdit;
                        setEditedRow(null);
                      }}
                      className="px-3 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md shadow"
                    >
                      <Save size="17px" />
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(ruangan)}
                      className="px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow"
                    >
                      <Pencil size="17px" />
                    </button>
                  )}

                  <button 
                  onClick={()=>{
                    deleteRuangan(ruangan.id_ruangan, ruangan.isi_ruangan);
                  }}
                  className="px-3 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md shadow">
                    <Trash size="17px" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
