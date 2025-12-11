import { db } from "@/lib/db";
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

    // Ambil data dari dummyktp
    const [rows] = await db.execute(
      "SELECT * FROM dummyktp WHERE nik = ? LIMIT 1",
      [nik]
    );

    if (rows.length === 0) {
      return Response.json(
        { success: false, error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    const r = rows[0];

    let formatted = "";
    if (r.tglLahir) {
      const d = new Date(r.tglLahir);
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
        tempatLahir: r.tempatLahir,
        tglLahir: formatted,
        jenisKelamin: r.jenisKelamin,
        golDarah: r.golDarah,
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
  console.log("await connection");
  const conn = await db.getConnection();
  console.log("get connection");

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
    console.log("get body json");

    // Format tanggal
    const tglMasuk = new Date();
    const sqlDate = tglMasuk.toISOString().slice(0, 19).replace("T", " ");
    
    console.log("Parsing ID Perawatan");
    const id_perawatan = generateIdPerawatan(nik_pasien);
    console.log("Done");

    await conn.beginTransaction();
    console.log("begin transaction");

    // CEK PASIEN
    const [cache] = await conn.execute(
      `SELECT * FROM tb_pasien WHERE nik_pasien=?`,
      [nik_pasien]
    );

    console.log("cache rows:", cache);

    // INSERT PASIEN JIKA BELUM ADA
    if (cache.length === 0) {
      await conn.execute(
        `INSERT INTO tb_pasien 
        (nik_pasien, nama_pasien, alamat_pasien, templa_pasien, tglla_pasien, jk_pasien, goldar_pasien, bpjs_pasien)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          nik_pasien ?? null,
          nama_pasien ?? null,
          alamat_pasien ?? null,
          templa_pasien ?? null,
          tglla_pasien ?? null,
          jk_pasien ?? null,
          goldar_pasien ?? null,
          bpjs_pasien ?? null,
        ]
      );
      console.log("INSERT pasien");
    }

    // INSERT PERAWATAN
    console.log("perawatan");
    await conn.execute(
      `INSERT INTO tb_perawatan 
      (id_perawatan, nik_pasien, id_staff, id_ruangan, tgl_masuk, tgl_keluar, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id_perawatan,
        nik_pasien ?? null,
        penanganan_pasien, 
        null,
        sqlDate,
        null,
        "Pending",
      ]
    );

    console.log("INSERT perawatan");

    await conn.commit();
    console.log("conn.commit");

    return Response.json({ success: true });

  } catch (error) {
    await conn.rollback();
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  } finally {
    conn.release();
  }
}

