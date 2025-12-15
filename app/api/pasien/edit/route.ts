import { sql } from "@/lib/db";

export async function GET(req:Request) {
  try {
    const { searchParams } = new URL(req.url);
    const nik_pasien = searchParams.get("nik_pasien");

    if (!nik_pasien) {
      return Response.json(
        { success: false, error: "nik_pasien wajib dikirim" },
        { status: 400 }
      );
    }

    const rows = await sql`
      SELECT *
      FROM tb_pasien
      WHERE nik_pasien = ${nik_pasien}
      LIMIT 1
    `;

    if (rows.length === 0) {
      return Response.json(
        { success: false, error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    const r = rows[0];

    let formatted = "";
    if (r.tglla_pasien) {
      const d = new Date(r.tglla_pasien);
      formatted = d.toISOString().split("T")[0];
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
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET tb_pasien error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req:Request) {
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

    let formattedDate = null;
    if (tglla_pasien) {
      const d = new Date(tglla_pasien);
      if (!isNaN(d)) {
        formattedDate = d.toISOString().split("T")[0];
      }
    }

    const result = await sql`
      UPDATE tb_pasien
      SET
        nama_pasien   = ${nama_pasien ?? null},
        alamat_pasien = ${alamat_pasien ?? null},
        templa_pasien = ${templa_pasien ?? null},
        tglla_pasien  = ${formattedDate},
        jk_pasien     = ${jk_pasien ?? null},
        goldar_pasien = ${goldar_pasien ?? null},
        bpjs_pasien   = ${bpjs_pasien ?? null}
      WHERE nik_pasien = ${nik_pasien}
    `;

    if (result.rowCount === 0) {
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
    console.error("PUT tb_pasien error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
