import { sql } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? ""; // ambil query search

    const rows = await sql`
      SELECT 
        p.id_perawatan,
        p.nik_pasien,
        ps.nama_pasien AS nama_pasien,
        ps.alamat_pasien,
        ps.jk_pasien,
        ps.bpjs_pasien, 

        p.id_staff,
        st.nama_staff AS nama_staff,

        p.id_ruangan,
        r.nama_ruangan AS nama_ruangan,

        p.tgl_masuk,
        p.tgl_keluar,
        p.status
      FROM tb_perawatan p
      LEFT JOIN tb_pasien ps 
        ON p.nik_pasien = ps.nik_pasien
      LEFT JOIN tb_staff st 
        ON p.id_staff = st.id_staff
      LEFT JOIN tb_ruangan r 
        ON p.id_ruangan = r.id_ruangan
      WHERE ps.nama_pasien ILIKE ${`%${search}%`} 
         OR st.nama_staff ILIKE ${`%${search}%`} 
         OR r.nama_ruangan ILIKE ${`%${search}%`}
      ORDER BY p.tgl_masuk DESC
    `;

    return Response.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("GET tb_perawatan error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id_perawatan, status, id_ruangan, tgl_keluar } = body;

    if (!id_perawatan) {
      return Response.json(
        { success: false, error: "id_perawatan wajib dikirim" },
        { status: 400 }
      );
    }

    // PostgreSQL: empty string is INVALID for date
    const keluarDate =
      tgl_keluar && tgl_keluar !== "" ? tgl_keluar : null;

    const result = await sql`
      UPDATE tb_perawatan
      SET
        status = ${status},
        id_ruangan = ${id_ruangan ?? null},
        tgl_keluar = ${keluarDate}
      WHERE id_perawatan = ${id_perawatan}
    `;

    if (result.rowCount === 0) {
      return Response.json(
        { success: false, error: "Perawatan tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: "Perawatan berhasil diperbarui" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT tb_perawatan error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id_perawatan } = body;

    if (!id_perawatan) {
      return Response.json(
        { success: false, error: "id_perawatan wajib dikirim" },
        { status: 400 }
      );
    }

    const result = await sql`
      DELETE FROM tb_perawatan
      WHERE id_perawatan = ${id_perawatan}
    `;

    if (result.rowCount === 0) {
      return Response.json(
        { success: false, error: "Perawatan tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: "Data perawatan berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE tb_perawatan error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
