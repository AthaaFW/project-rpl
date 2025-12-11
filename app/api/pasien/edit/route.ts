import { db } from "@/lib/db";
import { format } from "mysql2";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const nik_pasien = searchParams.get("nik_pasien");

    const [rows] = await db.execute(
      "SELECT * FROM tb_pasien WHERE nik_pasien=? LIMIT 1",
      [nik_pasien]
    );

    if (rows.length === 0) {
      return Response.json(
        { success: false, error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    const r = rows[0];

    // Format tanggal lahir
    let formatted = "";
    if (r.tglla_pasien) {
      const d = new Date(r.tglla_pasien);
      formatted = d.toISOString().split("T")[0]; // YYYY-MM-DD
    }

    return Response.json(
      {
        success: true,
        nik_pasien: r.nik_pasien,
        nama_pasien: r.nama_pasien,
        alamat_pasien: r.alamat_pasien,
        templa_pasien: r.templa_pasien,
        tglla_pasien: formatted,
        jk_pasien: r.jk_pasien,
        goldar_pasien: r.goldar_pasien,
        bpjs_pasien: r.bpjs_pasien,
        penanganan_pasien: r.penanganan_pasien,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();

    const {
      nik_pasien,
      nama_pasien,
      alamat_pasien,
      templa_pasien,
      tglla_pasien,
      jk_pasien,
      goldar_pasien,
      bpjs_pasien,
    } = body;

    if (!nik_pasien) {
      return Response.json(
        { success: false, error: "nik_pasien wajib dikirim" },
        { status: 400 }
      );
    }

    console.log(body);

    let formattedDate = null;

    if (tglla_pasien) {
      const d = new Date(tglla_pasien);

      if (!isNaN(d)) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");

        formattedDate = `${year}-${month}-${day}`;
      }
    }



    // Update ke database
    const [result] = await db.execute(
      `UPDATE tb_pasien
             SET nama_pasien=?,
                 alamat_pasien=?,
                 templa_pasien=?,
                 tglla_pasien=?,
                 jk_pasien=?,
                 goldar_pasien=?,
                 bpjs_pasien=?
             WHERE nik_pasien=?`,
      [
        nama_pasien ?? null,
        alamat_pasien ?? null,
        templa_pasien ?? null,
        formattedDate,
        jk_pasien ?? null,
        goldar_pasien ?? null,
        bpjs_pasien ?? null,
        nik_pasien ?? null
      ]
    );

    if (result.affectedRows === 0) {
      return Response.json(
        { success: false, error: "Pasien tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: "Data pasien berhasil diperbarui" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
