"use client";

import { useState } from "react";

interface ModalEditPasienProps {
  onClose: () => void;
}

export default function ModalEditPasien({ onClose }: ModalEditPasienProps) {
  
  const [status, setStatus] = useState("Rawat Jalan");
  const [ruangan, setRuangan] = useState("-");
  const [dokter, setDokter] = useState("");

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setStatus(val);

    if (val === "Rawat Jalan") {
      setRuangan("-");
    } else {
      setRuangan("");
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-96 p-6 rounded-xl shadow-xl animate-fadeIn"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Edit Pasien</h2>

        {/* STATUS */}
        <label className="block font-semibold mb-1">Status</label>
        <select
          value={status}
          onChange={handleStatusChange}
          className="w-full border border-gray-400 rounded px-3 py-2 mb-4"
        >
          <option value="Rawat Inap">Rawat Inap</option>
          <option value="Rawat Jalan">Rawat Jalan</option>
        </select>

        {/* RUANGAN */}
        <label className="block font-semibold mb-1">Ruangan</label>
        <select
  value={ruangan}
  onChange={(e) => setRuangan(e.target.value)}
  disabled={status === "Rawat Jalan"}
  className={`border px-3 py-2 rounded-md w-full ${
    status === "Rawat Jalan" ? "bg-gray-200 cursor-not-allowed" : ""
  }`}
>
  {status === "Rawat Jalan" ? (
    <option value="-">-</option>
  ) : (
    <>
      <option value="-">-</option>
      <option value="1A">1A</option>
      <option value="1B">1B</option>
      <option value="2A">2A</option>
      <option value="2B">2B</option>
    </>
  )}
</select>


        {/* DOKTER PENANGGUNG JAWAB */}
        <label className="block font-semibold mb-1">Dokter Penanggung Jawab</label>
        <input
          type="text"
          value={dokter}
          onChange={(e) => setDokter(e.target.value)}
          className="w-full border border-gray-400 rounded px-3 py-2 mb-4"
          placeholder="Nama dokter"
        />

        {/* BUTTON */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:opacity-80"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-80"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
