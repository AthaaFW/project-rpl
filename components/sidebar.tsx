"use client";

import Image from "next/image";
import ProfilePic from "@/images/Sadboy.png";
import Arrow from "@/images/Chevron right.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  // helper untuk menentukan apakah menu sedang aktif
  const isActive: (path: string) => boolean = (path) =>
  pathname.startsWith(path);

  const date = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="flex flex-col bg-green-sidebar h-screen max-w-64 py-6 px-5 font-bold gap-7 fixed left-0 top-18 z-5">

      {/* Profil */}
      <div
        id="Akun"
        className="flex flex-col justify-around bg-krem-acsent rounded-lg px-2 py-4 items-center gap-2 shadow-lg"
      >
        <Image src={ProfilePic} alt="PP" className="w-[65px] h-[65px] rounded-full" />
        <div className="text-center">
          <h1 className="text-2xl font-bold">Udin Sarudin</h1>
          <h1>Staff</h1>
        </div>
        <h1 className="text-lg font-bold text-center">{date}</h1>
      </div>

      {/* MENU LIST */}
      <ul
        className={`text-xl flex flex-row justify-between items-center w-52 
        rounded-lg p-2 cursor-pointer
        ${
          isActive("/pasien")
            ? "bg-krem-acsent shadow-lg"
            : "bg-transparent"
        }`}
      >
        <Link href="/pasien">Pasien</Link>
        <Image src={Arrow} alt="arrow" className="w-3 h-3" />
      </ul>

      <ul
        className={`text-xl flex flex-row justify-between items-center w-52 
        rounded-lg p-2 cursor-pointer
        ${
          isActive("/ruangan")
            ? "bg-krem-acsent shadow-lg"
            : "bg-transparent"
        }`}
      >
        <Link href="/ruangan">Ruangan</Link>
        <Image src={Arrow} alt="arrow" className="w-3 h-3" />
      </ul>

      <ul
        className={`text-xl flex flex-row justify-between items-center w-52 
        rounded-lg p-2 cursor-pointer
        ${
          isActive("/staff")
            ? "bg-krem-acsent shadow-lg"
            : "bg-transparent"
        }`}
      >
        <Link href="/staff">Staff</Link>
        <Image src={Arrow} alt="arrow" className="w-3 h-3" />
      </ul>

    </div>
  );
}
