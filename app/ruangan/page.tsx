"use client";

import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";
import SearchBar from "@/components/searchBar";
import ScrollToTopButton from "@/components/scrollToTop";
import TabelRuangan from "./tabelruangan";
import Link from "next/link";

export default function Home() {

  const handleSearch = (query: string) => {
    console.log("Cari:", query);
  };

  return (
    <div className="pl-72 pt-25">
      <Navbar />
      <Sidebar />
      <div className="flex flex-row justify-end">
      {/* <SearchBar onSearch={handleSearch}/> */}
      <Link href="ruangan/add">
      <button className="mr-4 text-white bg-green-nav px-4 py-2 font-bold text-md rounded-lg shadow-lg border-2 border-green-nav
      hover:opacity-80">
        Add   +
      </button>
      </Link>
      </div>
      <TabelRuangan />  
      <ScrollToTopButton />
    </div>
  );
}
