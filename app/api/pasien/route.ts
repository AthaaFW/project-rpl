import { sql } from "@/lib/db";

interface PerawatanUpdateBody {
  id_perawatan: string;
  status?: string;
  id_ruangan?: string | null;
  tgl_keluar?: string | null;
}

interface PerawatanDeleteBody {
  id_perawatan: string;
}

// GET /api/perawatan?search=...
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";

    const rows = await sql`
      SELECT 
        p.id_perawatan,
        p.nik_pasien,
        ps.nama_pasien,
        ps.alamat_pasien,
        ps.jk_pasien,
        ps.bpjs_pasien, 

        p.id_staff,
        st.nama_staff,

        p.id_ruangan,
        r.nama_ruangan,

        p.tgl_masuk,
        p.tgl_keluar,
        p.status
      FROM tb_perawatan p
      LEFT JOIN tb_pasien ps ON p.nik_pasien = ps.nik_pasien
      LEFT JOIN tb_staff st ON p.id_staff = st.id_staff
      LEFT JOIN tb_ruangan r ON p.id_ruangan = r.id_ruangan
      WHERE ps.nama_pasien ILIKE ${`%${search}%`}
         OR st.nama_staff ILIKE ${`%${search}%`}
         OR r.nama_ruangan ILIKE ${`%${search}%`}
      ORDER BY p.tgl_masuk DESC
    `;

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error: any) {
    console.error("GET tb_perawatan error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}

// PUT /api/perawatan
export async function PUT(req: Request) {
  try {
    const body: PerawatanUpdateBody = await req.json();
    const { id_perawatan, status, id_ruangan, tgl_keluar } = body;

    if (!id_perawatan) {
      return new Response(
        JSON.stringify({ success: false, error: "id_perawatan wajib dikirim" }),
        { status: 400 }
      );
    }

    const keluarDate = tgl_keluar && tgl_keluar.trim() !== "" ? tgl_keluar : null;

    const result = await sql`
      UPDATE tb_perawatan
      SET
        status = ${status},
        id_ruangan = ${id_ruangan ?? null},
        tgl_keluar = ${keluarDate}
      WHERE id_perawatan = ${id_perawatan}
    `;

    // PostgreSQL result might not have rowCount in some libs; safe check
    if (!("rowCount" in result) || result.rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Perawatan tidak ditemukan" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Perawatan berhasil diperbarui" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PUT tb_perawatan error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}

// DELETE /api/perawatan
export async function DELETE(req: Request) {
  try {
    const body: PerawatanDeleteBody = await req.json();
    const { id_perawatan } = body;

    if (!id_perawatan) {
      return new Response(
        JSON.stringify({ success: false, error: "id_perawatan wajib dikirim" }),
        { status: 400 }
      );
    }

    const result = await sql`
      DELETE FROM tb_perawatan
      WHERE id_perawatan = ${id_perawatan}
    `;

    if (!("rowCount" in result) || result.rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Perawatan tidak ditemukan" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Data perawatan berhasil dihapus" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE tb_perawatan error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
