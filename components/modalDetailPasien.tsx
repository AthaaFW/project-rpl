"use client";

import Image from "next/image";
import exampImage from "@/images/Sadboy.png";

interface ModalDetailPasienProps {
    onClose: () => void;
  }

export default function ModalDetailPasien({ onClose }: ModalDetailPasienProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-96 p-6 rounded-xl shadow-xl animate-fadeIn"
      >
        <h2 className="text-xl font-bold mb-3 text-center">Detail Pasien</h2>

        <div className="flex flex-col items-center">
          <Image src={exampImage} alt="PP" className="rounded-full w-24 h-24 mb-3" />
          <h1 className="font-bold text-lg">Rahmat Udin Sarudin</h1>
          <p className="text-sm text-gray-600">NIK: 327**********000</p>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <p><span className="font-semibold">Ruangan:</span> 1A</p>
          <p><span className="font-semibold">Umur:</span> 32</p>
          <p><span className="font-semibold">Golongan Darah:</span> A</p>
          <p><span className="font-semibold">Jenis Kelamin:</span> Laki-laki</p>
          <p><span className="font-semibold">BPJS:</span> Kelas A</p>
          <p><span className="font-semibold">Alamat:</span> Jl.Kaki 01/02, Cibiru, Cimekar, Bandung</p>
          <p><span className="font-semibold">Tempat/Tgl Lahir:</span> Bandung, 10/10/2010</p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-80"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
