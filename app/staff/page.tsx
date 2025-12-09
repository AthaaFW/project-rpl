"use client";

import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";
import SearchBar from "@/components/searchBar";
import ScrollToTopButton from "@/components/scrollToTop";
import StaffCard from "@/components/staffCard";
import Link from "next/link";

export default function Home() {

  const handleSearch = (text: string) => {
    console.log("Cari:", text);
  };

  let cards = [];

  for (let i = 0; i < 9; i++) {
    cards.push(<StaffCard />);
  }

  return (
    <div className="pl-72 pt-25">
      <Navbar />
      <Sidebar />
      <div className="flex flex-row justify-between">
      <SearchBar onSearch={handleSearch}/>
      <Link href="staff/add">
      <button className="mr-4 text-white bg-green-nav px-4 py-2 font-bold text-md rounded-lg shadow-lg border-2 border-green-nav
       hover:opacity-80">
        Add   +
      </button>
      </Link>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-start gap-8 py-6">
         {cards}
      </div>
      <ScrollToTopButton />
    </div>
  );
}
