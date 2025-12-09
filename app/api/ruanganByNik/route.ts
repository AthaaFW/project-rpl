import { db } from "@/lib/db";

export async function GET(req){
    try{
        const { searchParams } = new URL(req.url);
        const kelas_pasien = searchParams.get("kelas_pasien");

        const [rows] = await db.execute(
            "SELECT * FROM tb_ruangan WHERE kelas_ruangan=? AND ketersediaan_ruangan=?",
            [
                kelas_pasien,
                "Tersedia"
            ]
        );
        
        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
    }catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
      }
}