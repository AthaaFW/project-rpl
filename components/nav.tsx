import exampIcon from "@/images/GenericAvatar.png";
import Image from "next/image";

export default function Navbar() {
    return (
      <div className="flex flex-row bg-green-nav w-screen py-3 px-5 justify-between fixed top-0 left-0 z-999">
        <div className="flex flex-row items-center gap-5">
            <Image src={exampIcon} alt="Icon" className="w-[50px] h-[50px]"/>
            <h1 className="font-bold text-white text-2xl">Rumah Sakit Sejahtera</h1>
        </div>
      </div>  
      );
  }