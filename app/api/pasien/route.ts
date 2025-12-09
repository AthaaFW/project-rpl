import { db } from "@/lib/db";

export async function GET() {
  try {

    const [rows] = await db.query(`
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
      ORDER BY p.tgl_masuk DESC
    `);

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function PUT(req: Request){
  try{
    const body = await req.json();
    const { id_perawatan, status, id_ruangan, tgl_keluar } = body;

    const [result] = db.query(
      'UPDATE tb_perawatan SET status = ?, id_ruangan = ?, tgl_keluar = ? WHERE id_perawatan = ?',
      [
        status,
        id_ruangan ?? null,
        tgl_keluar ?? null,
        id_perawatan
      ]
    );

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
