"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RowPerawatan } from "./smth";

export default function PerawatanTable() {
  const [data, setData] = useState<any[]>([]);
  const [edited, setEdited] = useState({});

  useEffect(() => {
    fetch("/api/pasien")
      .then((res) => res.json())
      .then((result) => {
        console.log("DATA JSON :", JSON.stringify(result, null, 2));
        setData(result);
      });
  }, []);


  const updatePerawatan = async (id: String, newStatus: String, newRuangan: String, tgl_keluar:Date) => {
    try {
      const res = await fetch("/api/pasien", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_perawatan: id,
          status: newStatus,
          id_ruangan: newRuangan,
          tgl_keluar: tgl_keluar
        }),
      });
      const result = await res.json();
      console.log("UPDATE SUCCESS:", result);
    } catch (error) {
      console.error("UPDATE ERROR:", error);
    }
  };

  const setField = (id, field, value) => {
    setEdited(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Tabel Perawatan</h1>

      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden text-sm">
        <thead className="bg-green-nav text-white">
          <tr>
            <th className="px-2 py-3">No</th>
            <th className="px-2 text-left py-3">Nama Pasien</th>
            <th className="px-2 text-left py-3">ID Perawatan</th>
            <th className="px-2 text-left py-3">Dokter</th>
            <th className="px-2 text-left py-3">Ruangan</th>
            <th className="px-2 text-left py-3">Status</th>
            <th className="px-2 text-left py-3">Tanggal Masuk</th>
            <th className="px-2 text-left py-3">Tanggal Keluar</th>
            <th className="px-2 text-left py-3">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <RowPerawatan
            key={row.id_perawatan}
            row={row}
            index={index}
            edited={edited}
            setField={setField}
            updatePerawatan={updatePerawatan}
            formatDate={formatDate}
            setEdited={setEdited}
          />
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center p-4">
                Loading data...
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}
