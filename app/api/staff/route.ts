import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";

/* =======================
   GET
======================= */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id_staff = searchParams.get("id_staff");
    const search = searchParams.get("search");

    // 🔍 1. Get single staff by ID
    if (id_staff) {
      const rows = await sql`
        SELECT *
        FROM tb_staff
        WHERE id_staff = ${id_staff}
        LIMIT 1
      `;

      return Response.json(rows[0] || {});
    }

    // 🔍 2. Search staff
    if (search) {
      const rows = await sql`
        SELECT *
        FROM tb_staff
        WHERE nama_staff ILIKE ${"%" + search + "%"}
           OR email_staff ILIKE ${"%" + search + "%"}
           OR role_staff ILIKE ${"%" + search + "%"}
        ORDER BY id_staff
      `;

      return Response.json(rows);
    }

    // 🔍 3. Get all staff
    const rows = await sql`
      SELECT *
      FROM tb_staff
      ORDER BY id_staff
    `;

    return Response.json(rows);

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


/* =======================
   POST
======================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nik_staff,
      nama_staff,
      email_staff,
      password_staff,
      templa_staff,
      tglla_staff,
      goldar_staff,
      jk_staff,
      alamat_staff,
      role_staff,
    } = body;

    // =============================
    // 🔍 Cek duplikasi NIK
    // =============================
    const existing = await sql`
      SELECT 1
      FROM tb_staff
      WHERE nik_staff = ${nik_staff}
      LIMIT 1
    `;
    if (existing.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "NIK Staff sudah terdaftar",
        }),
        { status: 400 }
      );
    }

    // =============================
    // 🔥 Generate ID Staff
    // =============================
    const firstLetter = role_staff?.charAt(0).toUpperCase() || "S";
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const rand1 = String(Math.floor(Math.random() * 99) + 1).padStart(2, "0");
    const rand2 = String(Math.floor(Math.random() * 99) + 1).padStart(2, "0");
    const id_staff = `${firstLetter}-${year}${month}${rand1}${rand2}`;

    // =============================
    // 🔐 Hash Password
    // =============================
    const hashedPassword = await bcrypt.hash(password_staff, 10);

    // =============================
    // 📥 INSERT DATA
    // =============================
    await sql`
      INSERT INTO tb_staff (
        id_staff,
        nik_staff,
        nama_staff,
        email_staff,
        pasword_staff,
        templa_staff,
        tglla_staff,
        goldar_staff,
        jk_staff,
        alamat_staff,
        role_staff,
        status_staff
      ) VALUES (
        ${id_staff},
        ${nik_staff},
        ${nama_staff},
        ${email_staff},
        ${hashedPassword},
        ${templa_staff},
        ${tglla_staff},
        ${goldar_staff},
        ${jk_staff},
        ${alamat_staff},
        ${role_staff},
        'Clock In'
      )
    `;

    return new Response(
      JSON.stringify({
        success: true,
        message: "Staff berhasil ditambahkan",
        id_staff,
      }),
      { status: 200 }
    );

  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}

/* =======================
   PUT
======================= */
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id_staff = searchParams.get("id_staff");

    if (!id_staff) {
      return Response.json(
        { error: "id_staff wajib diisi" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { nama_staff, email_staff, role_staff } = body;

    await sql`
      UPDATE tb_staff
      SET
        nama_staff = ${nama_staff},
        email_staff = ${email_staff},
        role_staff = ${role_staff}
      WHERE id_staff = ${id_staff}
    `;

    return Response.json({ message: "Staff berhasil diupdate" });

  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

/* =======================
   DELETE
======================= */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id_staff = searchParams.get("id_staff");

    if (!id_staff) {
      return Response.json(
        { error: "id_staff wajib diisi" },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM tb_staff
      WHERE id_staff = ${id_staff}
    `;

    return Response.json({ message: "Staff berhasil dihapus" });

  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
