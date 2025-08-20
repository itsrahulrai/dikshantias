import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Hardcoded admin (later replace with DB like MongoDB/Postgres)
const ADMIN_EMAIL = "admin@dikshantias.com";
const ADMIN_PASSWORD_HASH = await bcrypt.hash("admin123", 10); // use hashed password

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ message: "Invalid email" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!isValid) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  // Create JWT token
  const token = jwt.sign(
    { email: ADMIN_EMAIL },
    process.env.JWT_SECRET || "supersecretkey",
    { expiresIn: "1d" }
  );

  return NextResponse.json({ token });
}
