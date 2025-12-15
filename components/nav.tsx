import exampIcon from "@/images/GenericAvatar.png";
import Image from "next/image";
import { DoorOpen } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
      <div className="flex flex-row bg-green-nav w-screen py-3 px-5 justify-between items-center fixed top-0 left-0 z-999">
        <Link href="/intro">
        <div className="flex flex-row items-center gap-5">
            <Image src={exampIcon} alt="Icon" className="w-[50px] h-[50px]"/>
            <h1 className="font-bold text-white text-2xl">Rumah Sakit Sejahtera</h1>
        </div>
        </Link>
      <Link href="/">
        <button className="bg-red-500 text-white p-2 rounded-full">
        <DoorOpen/>
        </button>
      </Link>
      </div>  
      );
  }