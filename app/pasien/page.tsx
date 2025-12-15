"use client";

import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";
import SearchBar from "@/components/searchBar";
import TabelPasien from "./tabelStaff";
import ScrollToTopButton from "@/components/scrollToTop";
import Link from "next/link";

export default function Home() {

  return (
    <div className="pl-72 pt-25">
      <Navbar />
      <Sidebar />
      <div className="flex flex-row justify-between">
      <Link href="pasien/add">
      <button className="mr-4 text-white bg-green-nav px-4 py-2 font-bold text-md rounded-lg shadow-lg 
      border-2 border-green-nav hover:opacity-80">
        Add   +
      </button>
      </Link>
      </div>
      <TabelPasien />
      <ScrollToTopButton />
    </div>
  );
}
