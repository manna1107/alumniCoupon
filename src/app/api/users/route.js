import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    console.log("Prisma Client:", prisma); // Debug Prisma Client

    const users = await prisma.users.findMany(); // ดึงข้อมูลจากตาราง users
    console.log("Fetched Users:", users); // Debug ดูข้อมูลที่ดึงมา

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return new Response(JSON.stringify({ error: "Error fetching users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
