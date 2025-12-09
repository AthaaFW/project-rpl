"use client";

import { useState } from "react";
import exampImage from "@/images/Sadboy.png";
import Image from "next/image";
import { PersonStanding, Pencil, Trash } from "lucide-react";
import ModalDetailPasien from "@/components/modalDetailPasien";
import ModalEditPasien from "@/components/modalEditPasien";

export default function PasienCard() {
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      {/* CARD */}
      <div className="flex flex-col items-center border border-gray-300 w-68 
        rounded-lg py-7 px-4 text-center gap-4 shadow-lg">

        <div className="flex flex-col items-center">
          <Image src={exampImage} alt="PP" className="rounded-full w-20 h-20" />
        </div>

        <div>
          <h1 className="font-bold text-xl">Rahmat Udin Sarudin</h1>
          <h1 className="text-sm">Nik: 327**********000</h1>
        </div>

        <div className="mt-4 space-y-2 text-sm text-start w-full px-3">
          <p><span className="font-semibold">Status:</span> Rawat Inap</p>
          <p><span className="font-semibold">Ruangan:</span> 1A</p>
          <p><span className="font-semibold">Dokter Penanggung Jawab:</span> <br /> dr. H. Masrip</p>
        </div>

        <div className="flex flex-row justify-between mt-5">
          <button
            onClick={() => setShowDetail(true)}
            className="text-white px-4 py-2 bg-green-nav rounded-l-full border-2 border-green-nav hover:opacity-80"
          >
            <PersonStanding />
          </button>

          <button
            onClick={() => setShowEdit(true)}
            className="text-white px-4 py-2 bg-blue-400 border-2 border-blue-400 hover:opacity-80"
          >
            <Pencil />
          </button>

          <button className="text-white px-4 py-2 bg-red-400 rounded-r-full border-2 border-red-400 hover:opacity-80">
            <Trash />
          </button>
        </div>
      </div>

      {showDetail && <ModalDetailPasien onClose={() => setShowDetail(false)} />}
      {showEdit && <ModalEditPasien onClose={() => setShowEdit(false)} />}
    </>
  );
}
