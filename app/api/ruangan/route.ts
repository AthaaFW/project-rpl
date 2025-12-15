import { sql } from "@/lib/db";

/* =======================
   GET ALL RUANGAN
======================= */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    let rows;

    if (search) {
      // Filter ruangan berdasarkan nama atau kelas
      rows = await sql`
        SELECT *
        FROM tb_ruangan
        WHERE nama_ruangan ILIKE ${"%" + search + "%"}
           OR kelas_ruangan ILIKE ${"%" + search + "%"}
      `;
    } else {
      // Ambil semua ruangan
      rows = await sql`
        SELECT *
        FROM tb_ruangan
      `;
    }

    return Response.json(rows, { status: 200 });

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama_ruangan, kelas_ruangan, kapasitas } = body;

    // ==== ID Generator ====
    function generateIdRuangan(nama: string) {
      const angka = nama.match(/\d+/);
      if (!angka) throw new Error("Nama ruangan tidak mengandung angka");

      const num = angka[0].padStart(3, "0");
      const huruf = nama.trim().slice(-1).toUpperCase();
      return `R-${num}${huruf}`;
    }

    const id_ruangan = generateIdRuangan(nama_ruangan);

    // ==== CEK DUPLIKAT ====
    const existing = await sql`
      SELECT 1
      FROM tb_ruangan
      WHERE nama_ruangan = ${nama_ruangan} OR id_ruangan = ${id_ruangan}
      LIMIT 1
    `;

    if (existing.length > 0) {
      // ❌ Return 400 supaya frontend bisa tampilkan alert
      return Response.json(
        { success: false, message: "Nama atau ID ruangan sudah ada!" },
        { status: 400 }
      );
    }

    // ==== INSERT ====
    const result = await sql`
      INSERT INTO tb_ruangan
        (id_ruangan, nama_ruangan, kelas_ruangan, kapasitas, isi_ruangan, ketersediaan_ruangan)
      VALUES
        (${id_ruangan}, ${nama_ruangan}, ${kelas_ruangan}, ${kapasitas}, 0, 'Tersedia')
      RETURNING *
    `;

    return Response.json(
      { success: true, message: "Ruangan berhasil ditambahkan", data: result[0] },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { success: false, message: "Terjadi kesalahan server", error: error.message },
      { status: 500 }
    );
  }
}

/* =======================
   PUT RUANGAN
======================= */
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id_ruangan = searchParams.get("id_ruangan");

    if (!id_ruangan) {
      return Response.json(
        { success: false, message: "id_ruangan wajib dikirim" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { nama_ruangan, kelas_ruangan, kapasitas } = body;

    // ==== CEK DUPLIKAT NAMA RUANGAN (Kecuali dirinya sendiri) ====
    if (nama_ruangan) {
      const duplicate = await sql`
        SELECT 1
        FROM tb_ruangan
        WHERE nama_ruangan = ${nama_ruangan} AND id_ruangan != ${id_ruangan}
        LIMIT 1
      `;

      if (duplicate.length > 0) {
        return Response.json(
          { success: false, message: "Nama ruangan sudah digunakan!" },
          { status: 400 }
        );
      }
    }

    // ==== UPDATE ====
    const result = await sql`
      UPDATE tb_ruangan
      SET
        nama_ruangan = ${nama_ruangan ?? null},
        kelas_ruangan = ${kelas_ruangan ?? null},
        kapasitas = ${kapasitas ?? null}
      WHERE id_ruangan = ${id_ruangan}
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json(
        { success: false, message: "Ruangan tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: "Ruangan berhasil diperbarui", data: result[0] },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { success: false, message: "Terjadi kesalahan server", error: error.message },
      { status: 500 }
    );
  }
}


/* =======================
   DELETE RUANGAN
======================= */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id_ruangan = searchParams.get("id_ruangan");

    if (!id_ruangan) {
      return Response.json(
        { error: "id_ruangan wajib dikirim" },
        { status: 400 }
      );
    }

    const result = await sql`
      DELETE FROM tb_ruangan
      WHERE id_ruangan = ${id_ruangan}
      RETURNING id_ruangan
    `;

    if (result.length === 0) {
      return Response.json(
        { success: false, error: "Ruangan tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: "Data ruangan berhasil dihapus" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("GET tb_pasien error:", error);
  
    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error), // fallback kalau bukan instance Error
      },
      { status: 500 }
    );
  }
}
