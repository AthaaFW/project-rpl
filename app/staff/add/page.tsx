"use client";

import { useState } from "react";
import Navbar from "@/components/nav";
import Sidebar from "@/components/sidebar";
import Link from "next/link";

export default function Home() {
    const [step, setStep] = useState(1);

    return (
        <div className="pl-72 pt-25">
            <Navbar />
            <Sidebar />

            <h1 className="text-2xl font-bold">Staff</h1>

            {/* WRAPPER FORM BIODATA */}
            <div
                className={`form-slide ${
                    step === 1 ? "enter-right" : "off-left"
                } absolute w-[60%]`}
            >
                <div className="max-w-2xl mx-auto mt-5 p-6 rounded-xl shadow border border-gray-300 bg-white">

                    <h2 className="text-xl font-bold mb-4">Biodata</h2>

                    {/* NIK */}
                    <label className="block font-semibold mb-1">NIK</label>
                    <input type="text" placeholder="1234567890123456"
                        className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-white" />

                    {/* Nama */}
                    <label className="block font-semibold mb-1">Nama Lengkap</label>
                    <input type="text" placeholder="Nama Lengkap"
                        className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-white" />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-1">Alamat</label>
                            <textarea
                                placeholder="Jalan, RT/RW, Kelurahan..."
                                className="w-full h-[90px] border border-gray-400 rounded px-3 py-2 bg-white resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Tempat/Tgl Lahir</label>
                            <input type="text" placeholder="Kota"
                                className="w-full mb-2 border border-gray-400 rounded px-3 py-2 bg-white" />
                            <input type="text" placeholder="DD/MM/YYYY"
                                className="w-full border border-gray-400 rounded px-3 py-2 bg-white" />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="bg-green-700 text-white px-5 py-2 rounded-lg shadow"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* WRAPPER FORM EMAIL/PASSWORD */}
            <div
                className={`form-slide ${
                    step === 2 ? "enter-right" : "off-right"
                } absolute w-[60%]`}
            >
                <div className="max-w-2xl mx-auto mt-5 p-6 rounded-xl shadow border border-gray-300 bg-white">

                    <h2 className="text-xl font-bold mb-4">Akun Login</h2>

                    <label className="block font-semibold mb-1">Email</label>
                    <input type="email" placeholder="email@example.com"
                        className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-white" />

                    <label className="block font-semibold mb-1">Password</label>
                    <input type="password" placeholder="Password"
                        className="w-full mb-4 border border-gray-400 rounded px-3 py-2 bg-white" />

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="bg-red-700 text-white px-5 py-2 rounded-lg shadow"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-green-700 text-white px-5 py-2 rounded-lg shadow"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
