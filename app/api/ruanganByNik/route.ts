import { sql } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const kelas_pasien = searchParams.get("kelas_pasien");

    if (!kelas_pasien) {
      const rows = await sql`
      SELECT *
      FROM tb_ruangan
    `;

    return Response.json(rows, { status: 200 });
    }

    const rows = await sql`
      SELECT *
      FROM tb_ruangan
      WHERE kelas_ruangan = ${kelas_pasien}
        AND ketersediaan_ruangan = 'Tersedia'
    `;

    return Response.json(rows, { status: 200 });
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
