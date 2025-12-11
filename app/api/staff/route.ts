import { db } from "@/lib/db";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id_staff = searchParams.get("id_staff");

        // 🔍 Jika query pakai ?id=xxx
        if (id_staff) {
            const [rows] = await db.query(
                `SELECT * FROM tb_staff WHERE id_staff=?`,
                [id_staff]
            );

            // Ambil 1 data saja (object, bukan array)
            return new Response(JSON.stringify(rows[0] || {}), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Jika tidak ada id → list semua staff
        const [rows] = await db.query(
            `SELECT * FROM tb_staff`
        );

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


export async function POST(req) {
    try {
      const body = await req.json();
      const { nama_staff, email_staff, role_staff } = body;
  
      // =============================
      // 🔥 Generate ID
      // =============================
      const firstLetter = role_staff?.charAt(0).toUpperCase() || "S";
  
      const now = new Date();
      const year = now.getFullYear().toString().slice(-2); // 2 digit tahun
      const month = String(now.getMonth() + 1).padStart(2, "0"); // 2 digit bulan
  
      const rand1 = String(Math.floor(Math.random() * 99) + 1).padStart(2, "0");
      const rand2 = String(Math.floor(Math.random() * 99) + 1).padStart(2, "0");
  
      const id_staff = `${firstLetter}-${year}${month}${rand1}${rand2}`;
  
      // =============================
      // INSERT
      // =============================
      const sql = `
        INSERT INTO tb_staff (id_staff, nama_staff, email_staff, role_staff, status_staff)
        VALUES (?, ?, ?, ?, ?)
      `;
  
      await db.query(sql, [
        id_staff,
        nama_staff,
        email_staff,
        role_staff,
        "Clock In",
      ]);
  
      return Response.json({
        message: "Staff berhasil ditambahkan",
        id_staff: id_staff,
      });
    } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  }

export async function PUT(req) {
    try {
      const url = new URL(req.url);
      const id_staff = url.searchParams.get("id_staff");
  
      if (!id_staff)
        return Response.json({ error: "id_staff wajib diisi" }, { status: 400 });
  
      const body = await req.json();
      const { nama_staff, email_staff, role_staff } = body;
  
      const sql = `
        UPDATE tb_staff 
        SET nama_staff=?, email_staff=?, role_staff=?
        WHERE id_staff=?
      `;
  
      await db.query(sql, [
        nama_staff,
        email_staff,
        role_staff,
        id_staff,
      ]);
  
      return Response.json({ message: "Staff berhasil diupdate" });
    } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  }

export async function DELETE(req) {
    try {
      const url = new URL(req.url);
      const id_staff = url.searchParams.get("id_staff");
  
      if (!id_staff)
        return Response.json({ error: "id_staff wajib diisi" }, { status: 400 });
  
      await db.query("DELETE FROM tb_staff WHERE id_staff=?", [id_staff]);
  
      return Response.json({ message: "Staff berhasil dihapus" });
    } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  }
