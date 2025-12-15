import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const nik = searchParams.get("nik");

    if (!nik) {
      return Response.json(
        { success: false, error: "Query nik tidak ditemukan" },
        { status: 400 }
      );
    }

    // Ambil data dari dummyktp (Neon)
    const rows = await sql`
      SELECT *
      FROM dummyktp
      WHERE nik = ${nik}
      LIMIT 1
    `;

    console.log(rows[0]);

    if (rows.length === 0) {
      return Response.json(
        { success: false, error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    const r = rows[0];

let formatted = "";
if (r.tgllahir) {
  const d = new Date(r.tgllahir);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  formatted = `${year}-${month}-${day}`;
}

return Response.json(
  {
    success: true,
    nama: r.nama,
    alamat: r.alamat,
    tempatLahir: r.tempatlahir,
    tglLahir: formatted,
    jenisKelamin: r.jeniskelamin,
    golDarah: r.goldarah,
    bpjs: r.bpjs,
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




function generateIdPerawatan(nik) {
  const now = new Date();

  const year = String(now.getFullYear()).slice(-2); // 2 digit terakhir
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const last3 = nik.slice(-3); // 3 digit terakhir NIK

  return `P-${year}${month}${day}${last3}`;
}



export async function POST(req) {
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
      penanganan_pasien,
    } = body;

    const id_perawatan = generateIdPerawatan(nik_pasien);

    // ==== CEK DUPLIKAT PERAWATAN HARI INI ====
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set ke awal hari
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const duplicate = await sql`
      SELECT 1 FROM tb_perawatan
      WHERE nik_pasien = ${nik_pasien}
        AND tgl_masuk >= ${today}
        AND tgl_masuk < ${tomorrow}
    `;

    if (duplicate.length > 0) {
      return Response.json(
        { success: false, message: "Data sudah ada" },
        { status: 400 }
      );
    }

    await sql`BEGIN`;

    // ==== CEK PASIEN ====
    const cache = await sql`
      SELECT 1 FROM tb_pasien
      WHERE nik_pasien = ${nik_pasien}
    `;

    if (cache.length === 0) {
      await sql`
        INSERT INTO tb_pasien
        (nik_pasien, nama_pasien, alamat_pasien, templa_pasien, tglla_pasien, jk_pasien, goldar_pasien, bpjs_pasien)
        VALUES (
          ${nik_pasien},
          ${nama_pasien},
          ${alamat_pasien},
          ${templa_pasien},
          ${tglla_pasien || null},
          ${jk_pasien},
          ${goldar_pasien},
          ${bpjs_pasien}
        )
      `;
    }

    // ==== INSERT PERAWATAN ====
    await sql`
      INSERT INTO tb_perawatan
      (id_perawatan, nik_pasien, id_staff, id_ruangan, tgl_masuk, tgl_keluar, status)
      VALUES (
        ${id_perawatan},
        ${nik_pasien},
        ${penanganan_pasien},
        ${null},
        ${new Date()},
        ${null},
        ${"Pending"}
      )
    `;

    await sql`COMMIT`;

    return Response.json({ success: true });

  } catch (error) {
    await sql`ROLLBACK`;
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


