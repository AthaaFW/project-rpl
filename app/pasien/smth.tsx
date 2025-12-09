import { useRuanganKelas } from "../hooks/useRuanganKelas";
import { Pencil, Trash, CheckIcon } from "lucide-react";
import Link from "next/link";

export function RowPerawatan({ row, index, edited, setField, updatePerawatan, formatDate, setEdited }) {
    const ruanganList = useRuanganKelas(row.bpjs_pasien);

    return (
        <tr className="border-b hover:bg-green-50 transition">

            {/* NO */}
            <td className="p-3 text-center">{index + 1}</td>

            {/* NAMA PASIEN */}
            <td className="p-3">{row.nama_pasien}</td>

            {/* ID PERAWATAN */}
            <td className="p-3">{row.id_perawatan}</td>

            {/* DOKTER */}
            <td className="p-3">{row.nama_staff}</td>

            {/* RUANGAN */}
            <td className="p-3">
                {(edited[row.id_perawatan]?.status ?? row.status) === "Rawat Inap" ? (
                    <select
                        className="border rounded px-2 py-1"
                        value={edited[row.id_perawatan]?.id_ruangan ?? row.id_ruangan}
                        onChange={(e) =>
                            setField(row.id_perawatan, "id_ruangan", e.target.value)
                        }
                    >
                        <option value="">-- Pilih Ruangan --</option>

                        {ruanganList.map((r) => (
                            <option key={r.id_ruangan} value={r.id_ruangan}>
                                {r.nama_ruangan}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span>-</span>
                )}
            </td>

            {/* STATUS */}
            <td className="p-3">
                <select
                    className="border rounded px-2 py-1"
                    value={edited[row.id_perawatan]?.status ?? row.status}
                    onChange={(e) => setField(row.id_perawatan, "status", e.target.value)}
                >
                    <option value="Rawat Inap">Rawat Inap</option>
                    <option value="Rawat Jalan">Rawat Jalan</option>
                    <option value="Pending">Pending</option>
                </select>
            </td>

            {/* TANGGAL MASUK */}
            <td className="p-3">
                {row.tgl_masuk
                    ? new Date(row.tgl_masuk).toLocaleDateString("id-ID")
                    : "-"}
            </td>

            {/* TANGGAL KELUAR */}
            <td className="p-3">
                {row.tgl_keluar === null ? (
                    <span>-</span>
                ) : (
                    <input
                        type="date"
                        className="border rounded px-2 py-1"
                        value={edited[row.id_perawatan]?.tgl_keluar ?? formatDate(row.tgl_keluar)}
                        onChange={(e) =>
                            setField(row.id_perawatan, "tgl_keluar", e.target.value)
                        }
                    />
                )}
            </td>

            {/* AKSI */}
            <td className="p-3 flex gap-2">
                {edited[row.id_perawatan] && (
                    <button
                        onClick={() => {
                            const changes = edited[row.id_perawatan];
                            updatePerawatan(
                                row.id_perawatan,
                                changes.status ?? row.status,
                                changes.id_ruangan ?? row.id_ruangan,
                                changes.tgl_keluar ?? row.tgl_keluar
                            );

                        }}
                        className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                    >
                        <CheckIcon size={16} />
                    </button>
                )}
                <Link
                    href={`/perawatan/edit/${row.id_perawatan}`}
                    className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow flex items-center"
                >
                    <Pencil size="17px" />
                </Link>
                <button className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow flex items-center">
                    <Trash size="17px" />
                </button>
            </td>
        </tr>
    );
}
