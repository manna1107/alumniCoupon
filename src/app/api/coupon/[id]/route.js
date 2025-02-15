import prisma from '@/libs'; // Import Prisma

export default async function handler(req, res) {
    const { coupon_id } = req.query;

    if (req.method === "GET") {
        try {
            const query = `
                SELECT t.*, s.store_name, s.location, s.address 
                FROM ticket t 
                JOIN store s ON t.store_id = s.store_id
                WHERE t.coupon_id = ?
            `;
            const [rows] = await prisma.query(query, [coupon_id]);

            if (rows.length === 0) {
                return res.status(404).json({ error: "Coupon not found" });
            }

            res.status(200).json(rows[0]); // ส่งข้อมูลคูปองและร้านค้าไปยัง frontend
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Database error" });
        }
    }
}
