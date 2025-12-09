import exampImage from "@/images/Sadboy.png";
import Image from "next/image";
import { PersonStanding, Pencil, Trash } from "lucide-react";

export default function StaffCard() {
    return (
      <div className="flex flex-col items-center border border-gray-300 w-68  rounded-lg py-7 px-4 text-center gap-2 shadow-lg ">
        <div className="flex flex-col items-center gap-4">
        <Image src={exampImage} alt="PP" className="rounded-full w-19 h-19"/>
        <h1 className="text-sm">ID: 327**********000</h1>
        </div>
        <h1 className="font-bold text-xl">Dr. Dadang Pendragon</h1>
        <h1 className="text-md">Dokter</h1>
        <div className="flex flex-row justify-between mt-5">
          <button className="text-white px-4 py-2 bg-green-nav rounded-l-full border-2 border-green-nav
          hover:bg-white hover:text-green-nav">
            <PersonStanding />
          </button>
          <button className="text-white px-4 py-2 bg-blue-400 border-2 border-blue-400 
          hover:bg-white hover:text-blue-400">
            <Pencil />
          </button>
          <button className="text-white px-4 py-2 bg-red-400 rounded-r-full border-2 border-red-400
          hover:bg-white hover:text-red-400">
            <Trash />
          </button>
        </div>
      </div> 
      );
  }