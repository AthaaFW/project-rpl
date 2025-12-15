import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 🔍 Cari staff berdasarkan email
    const rows = await sql`
      SELECT *
      FROM tb_staff
      WHERE email_staff = ${email}
      LIMIT 1
    `;

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email atau password salah",
        }),
        { status: 401 }
      );
    }

    const staff = rows[0];

    // 🔐 Cocokkan password
    const isValidPassword = await bcrypt.compare(
      password,
      staff.pasword_staff
    );

    if (!isValidPassword) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email atau password salah",
        }),
        { status: 401 }
      );
    }

    // ✅ Login berhasil
    return new Response(
      JSON.stringify({
        success: true,
        staff: {
          id_staff: staff.id_staff,
          nama_staff: staff.nama_staff,
          email_staff: staff.email_staff,
          role_staff: staff.role_staff,
          status_staff: staff.status_staff,
        },
      }),
      { status: 200 }
    );

  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
