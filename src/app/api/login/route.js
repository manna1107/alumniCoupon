import bcrypt from "bcryptjs";

const users = [
  { id: 1, email: "admin@example.com", password: bcrypt.hashSync("admin123", 10), role: "admin" },
  { id: 2, email: "user@example.com", password: bcrypt.hashSync("user123", 10), role: "user" },
];

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.status(200).json({ user: { id: user.id, email: user.email, role: user.role } });
}
