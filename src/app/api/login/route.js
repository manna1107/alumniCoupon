import bcrypt from "bcrypt";

const users = [
  { id: 1, email: "admin@example.com", password: bcrypt.hashSync("admin123", 10), role: "admin" },
  { id: 2, email: "user@example.com", password: bcrypt.hashSync("user123", 10), role: "user" },
];

export const POST = async (req) => {
  try {
    const body = await req.json(); // ใช้ .json() เพื่ออ่านค่า body
    const { email, password } = body;

    const user = users.find((u) => u.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
    }

    return new Response(JSON.stringify({ user: { id: user.id, email: user.email, role: user.role } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};
