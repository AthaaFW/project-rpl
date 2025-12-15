"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RowPerawatan } from "./smth";

// ✅ Define types
interface PerawatanType {
  id_perawatan: string;
  nik_pasien: string;
  nama_pasien: string;
  id_staff?: string | null;
  nama_staff?: string | null;
  id_ruangan?: string | null;
  nama_ruangan?: string | null;
  tgl_masuk?: string | null;
  tgl_keluar?: string | null;
  status?: string;
}

type EditedType = Record<string, Partial<PerawatanType>>;
type SavedType = Record<string, boolean>;

export default function PerawatanTable() {
  const [data, setData] = useState<PerawatanType[]>([]);
  const [edited, setEdited] = useState<EditedType>({});
  const [saved, setSaved] = useState<SavedType>({});

  const getPerawatan = () => {
    fetch("/api/pasien")
      .then((res) => res.json())
      .then((result: PerawatanType[]) => {
        console.log("DATA JSON :", JSON.stringify(result, null, 2));
        setData(result);
      });
  };

  useEffect(() => {
    getPerawatan();
  }, []);

  const updatePerawatan = async (
    id: string,
    newStatus: string,
    newRuangan: string | null,
    tgl_keluar: string | null
  ) => {
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
          tgl_keluar,
        }),
      });
      const result = await res.json();
      console.log("UPDATE SUCCESS:", result);
    } catch (error) {
      console.error("UPDATE ERROR:", error);
    }
  };

  const setField = <K extends keyof PerawatanType>(
    id: string,
    field: K,
    value: PerawatanType[K]
  ) => {
    setEdited((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));

    setSaved((prev) => ({ ...prev, [id]: false }));
  };

  const formatDate = (date?: string | null) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const deletePerawatan = async (id: string) => {
    if (!confirm("Yakin ingin menghapus staff ini?")) return;
    try {
      await fetch("/api/pasien", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_perawatan: id,
        }),
      });
      getPerawatan();
      console.log("DELETE SUCCESS");
    } catch (error) {
      console.log("DELETE GAGAL:", error);
    }
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
            edited={edited[row.id_perawatan] || {}}
            setField={(id, field, value) => setField(id, field, value)}
            setSaved={setSaved}
            updatePerawatan={updatePerawatan}
            formatDate={formatDate}
            saved={!!saved[row.id_perawatan]}
            deletePerawatan={() => deletePerawatan(row.id_perawatan)}
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
