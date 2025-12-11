import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log(email, password);

    const [rows] = await db.query(
      `SELECT * FROM tb_staff WHERE email_staff=? AND pasword_staff=?`,
      [email, password]
    );

    if (rows.length === 0) {
      return new Response(JSON.stringify({ success: false, message: "Akun tidak ditemukan" }), {
        status: 401,
      });
    }

    return new Response(JSON.stringify({ success: true, staff: rows[0] }), {
      status: 200,
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
