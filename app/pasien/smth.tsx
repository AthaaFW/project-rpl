import { useRuanganKelas } from "../hooks/useRuanganKelas";
import { PersonStanding, Trash, CheckIcon } from "lucide-react";
import Link from "next/link";
import { PerawatanType } from "../types/types";

interface RowPerawatanProps {
  row: PerawatanType;
  index: number;
  edited: Partial<PerawatanType>;
  setField: <K extends keyof PerawatanType>(
    id: string,
    field: K,
    value: PerawatanType[K]
  ) => void;
  updatePerawatan: (
    id: string,
    newStatus: string,
    newRuangan: string | null,
    tgl_keluar: string | null
  ) => Promise<void>;
  formatDate: (date: string | null | undefined) => string;
  saved: boolean;
  setSaved: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  deletePerawatan: () => void;
}



export function RowPerawatan({
  row,
  index,
  edited,
  setField,
  updatePerawatan,
  formatDate,
  saved,
  setSaved,
  deletePerawatan,
}: RowPerawatanProps) {
  const ruanganList = useRuanganKelas(row.bpjs_pasien ?? "");

  const isEdited = Object.keys(edited).length > 0;

  const fieldValue = (key: keyof PerawatanType) => {
    const val = edited[key] ?? row[key];
    if (!val) return "";
    if (key === "tgl_keluar" || key === "tgl_masuk") {
      return new Date(val).toISOString().split("T")[0];
    }
    return val;
  };

  return (
    <tr className="border-b hover:bg-green-50 transition">
      <td className="p-3 text-center">{index + 1}</td>
      <td className="p-3">{row.nama_pasien}</td>
      <td className="p-3">{row.id_perawatan}</td>
      <td className="p-3">{row.nama_staff}</td>

      {/* Ruangan */}
      <td className="p-3">
        {fieldValue("status") === "Rawat Inap" ? (
          <select
            className="border rounded px-2 py-1"
            value={fieldValue("id_ruangan")}
            onChange={(e) =>
              setField(row.id_perawatan, "id_ruangan", e.target.value)
            }
          >
            <option value="">{row.nama_ruangan ?? "-- Pilih Ruangan --"}</option>
            {ruanganList
              .filter((r) => r.nama_ruangan !== row.nama_ruangan)
              .map((r) => (
                <option key={r.id_ruangan} value={r.id_ruangan}>
                  {r.nama_ruangan}
                </option>
              ))}
          </select>
        ) : (
          <span>-</span>
        )}
      </td>

      {/* Status */}
      <td className="p-3">
        <select
          className="border rounded px-2 py-1"
          value={fieldValue("status")}
          onChange={(e) =>
            setField(row.id_perawatan, "status", e.target.value)
          }
        >
          <option value="Rawat Inap">Rawat Inap</option>
          <option value="Rawat Jalan">Rawat Jalan</option>
          <option value="Pending">Pending</option>
        </select>
      </td>

      {/* Tanggal Masuk */}
      <td className="p-3">
        {row.tgl_masuk ? formatDate(row.tgl_masuk) : "-"}
      </td>

      {/* Tanggal Keluar */}
      <td className="p-3">
        <input
          type="date"
          className="border rounded px-2 py-1"
          value={fieldValue("tgl_keluar")}
          onChange={(e) =>
            setField(row.id_perawatan, "tgl_keluar", e.target.value)
          }
        />
      </td>

      {/* Aksi */}

      <td className="p-3 flex gap-2">
        {isEdited && !saved && (
          <button
            onClick={async () => {
              const changes = edited;
              await updatePerawatan(
                row.id_perawatan,
                changes.status ?? row.status ?? "",
                changes.id_ruangan ?? row.id_ruangan ?? null,
                changes.tgl_keluar ?? row.tgl_keluar ?? null
              );

              setSaved((prev) => ({
                ...prev,
                [row.id_perawatan]: true,
              }));
            }}
            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            <CheckIcon size={16} />
          </button>
        )}

        <Link
          href={`/pasien/detail?nik_pasien=${row.nik_pasien}`}
          className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow flex items-center"
        >
          <PersonStanding size="17px" />
        </Link>

        <button
          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow flex items-center"
          onClick={deletePerawatan}
        >
          <Trash size="17px" />
        </button>
      </td>
    </tr>
  );
}
