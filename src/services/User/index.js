import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      console.log("Prisma Client:", prisma); // Debug Prisma Client

      const users = await prisma.users.findMany(); // ดึงข้อมูลจากตาราง users
      console.log("Fetched Users:", users); // Debug ดูข้อมูลที่ดึงมา

      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Error fetching users" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
