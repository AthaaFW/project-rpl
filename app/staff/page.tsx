"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";
import SearchBar from "@/components/searchBar";
import ScrollToTopButton from "@/components/scrollToTop";
import Link from "next/link";
import { Trash, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

// Staff type
interface StaffType {
  id_staff: string;
  nama_staff: string;
  email_staff: string;
  role_staff: string;
  status_staff: string;
}

export default function StaffPage() {
  const router = useRouter();
  const [staff, setStaff] = useState<StaffType[]>([]);
  const [loading, setLoading] = useState(true);

  const getStaff = async (query: string = "") => {
    setLoading(true);
    try {
      const res = await fetch(
        query ? `/api/staff?search=${encodeURIComponent(query)}` : `/api/staff`
      );
      const result: StaffType[] = await res.json();
      setStaff(result || []);
    } catch (err) {
      console.error("Failed to fetch staff:", err);
      setStaff([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  const deleteStaff = async (id: string) => {
    if (!confirm("Testing Gk boleh hapus akun staff!")) return;

    try {
      // Uncomment when delete API is ready
      // await fetch(`/api/staff?id_staff=${id}`, {
      //   method: "DELETE",
      // });

      // Refresh staff list
      getStaff();
    } catch (err) {
      console.error("Failed to delete staff:", err);
    }
  };

  const handleSearch = (query: string) => {
    getStaff(query);
  };

  return (
    <div className="pl-72 pt-25">
      <Navbar />
      <Sidebar />

      <div className="flex flex-row justify-between items-center">
        <SearchBar onSearch={handleSearch} />
        <Link href="/staff/add">
          <button className="mr-4 text-white bg-green-nav px-4 py-2 font-bold text-md rounded-lg shadow-lg border-2 border-green-nav hover:opacity-80">
            Add +
          </button>
        </Link>
      </div>

      <div className="mt-6 mr-6 bg-white rounded-lg shadow overflow-x-auto">
        {loading ? (
          <p className="p-4 text-gray-600">Loading...</p>
        ) : staff.length === 0 ? (
          <p className="p-4 text-gray-600">No staff found.</p>
        ) : (
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-green-nav text-white text-left">
                <th className="p-3">ID Staff</th>
                <th className="p-3">Nama</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {staff.map((row) => (
                <tr
                  key={row.id_staff}
                  className="border-b hover:bg-green-50 transition"
                >
                  <td className="p-3">{row.id_staff}</td>
                  <td className="p-3">{row.nama_staff}</td>
                  <td className="p-3">{row.email_staff}</td>
                  <td className="p-3">{row.role_staff}</td>
                  <td className="p-3">{row.status_staff}</td>

                  <td className="p-3 flex gap-2 justify-center">
                    {/* EDIT */}
                    <button
                      className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
                      onClick={() => router.push(`/staff/edit?id=${row.id_staff}`)}
                    >
                      <Pencil size={16} />
                    </button>

                    {/* DELETE */}
                    <button
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow"
                      onClick={() => deleteStaff(row.id_staff)}
                    >
                      <Trash size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ScrollToTopButton />
    </div>
  );
}
