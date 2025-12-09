"use client";

import { useEffect, useState } from "react";

export function useRuanganKelas(kelas_pasien: string | null) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!kelas_pasien) return; // jika belum ada kelas, jangan fetch

    fetch(`/api/ruanganByNik?kelas_pasien=${kelas_pasien}`)
      .then((res) => res.json())
      .then((result) => {
        console.log("DATA RUANGAN:", result);
        setData(result);
      });
  }, [kelas_pasien]);

  return data;
}
