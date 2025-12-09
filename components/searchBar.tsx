"use client";
import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(query);
    }
  };

  return (
    <div className="relative w-full max-w-md rounded-xl">
      <input
        type="text"
        placeholder="Search…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full border border-gray-300 px-4 py-2 pr-10 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-green-nav shadow"
      />

      <Search 
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  );
}
