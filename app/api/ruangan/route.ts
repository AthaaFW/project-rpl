import { db } from "@/lib/db";

export async function GET(){
    try{
        const [rows] = await db.query(
            `SELECT * FROM tb_ruangan`
        )

        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
    }catch(error){
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
          });
    }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { nama_ruangan, kelas_ruangan, kapasitas } = body;

    // ==== ID GENERATOR ====
    function generateIdRuangan(nama) {
      const angka = nama.match(/\d+/);          // ambil angka
      if (!angka) throw new Error("Nama ruangan tidak mengandung angka");

      const num = angka[0].padStart(3, "0");    // jadikan 3 digit
      const huruf = nama.trim().slice(-1).toUpperCase(); // ambil huruf terakhir

      return `R-${num}${huruf}`;
    }

    const id_ruangan = generateIdRuangan(nama_ruangan);


    // ==== CEK DUPLIKAT ====
    const [same] = await db.query(
      `SELECT * FROM tb_ruangan WHERE nama_ruangan=? OR id_ruangan=?`,
      [nama_ruangan, id_ruangan]
    );

    if (same.length > 0) {
      return Response.json(
        { message: "Nama atau ID ruangan sudah ada!", status: 400 },
        { status: 400 }
      );
    }

    // ==== INSERT DATA ====
    const [result] = await db.query(
      `INSERT INTO tb_ruangan 
      (id_ruangan, nama_ruangan, kelas_ruangan, kapasitas, isi_ruangan, ketersediaan_ruangan) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id_ruangan,
        nama_ruangan,
        kelas_ruangan,
        kapasitas,
        0,            // isi ruangan default 0
        'Tersedia'       // contoh jika ada kolom status
      ]
    );

    return Response.json(
      { message: "Ruangan berhasil ditambahkan", data: result },
      { status: 200 }
    );

  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { message: "Terjadi kesalahan server", error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(req){
    try{
        const { searchParams } = new URL(req.url);
        const id_ruangan =  searchParams.get('id_ruangan');

        const body =  await req.json();
        const { nama_ruangan, kelas_ruangan, kapasitas } = body;

        console.log(id_ruangan, body);

        const [result] = await db.query(
            `UPDATE tb_ruangan set nama_ruangan=?, kelas_ruangan=?, kapasitas=? WHERE id_ruangan=?`,
            [
                nama_ruangan ?? null,
                kelas_ruangan ?? null,
                kapasitas ?? null,
                id_ruangan 
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

export async function DELETE(req){
    try{
        const { searchParams } = new URL(req.url);
        const id_ruangan = searchParams.get('id_ruangan');
        
        console.log(id_ruangan);

        const [result] = await db.query(
            `DELETE FROM tb_ruangan WHERE id_ruangan=?`,
            [id_ruangan]
        )
        console.log(result)

        if (result.affectedRows === 0) {
            return Response.json(
              { success: false, error: "Ruangan tidak ditemukan" },
              { status: 404 }
            );
          }
      
          return Response.json(
            { success: true, message: "Data ruangan berhasil dihapus" },
            { status: 200 }
          );
    }catch(error){
        return Response.json(
          { success: false, error: error.message },
          { status: 500 }
        );
    }
}