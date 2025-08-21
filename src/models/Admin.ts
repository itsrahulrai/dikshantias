"use server";

import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

// Updated Admin interface to include name
export interface Admin {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

// Find admin by email (unchanged)
export async function findAdminByEmail(email: string): Promise<Admin | null> {
  const client = await clientPromise;
  const db = client.db("dikshantias");
  const admin = await db.collection("admins").findOne({ email });
  return admin as Admin | null;
}

// Create admin now includes name
export async function createAdmin(name: string, email: string, plainPassword: string): Promise<Admin> {
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  const client = await clientPromise;
  const db = client.db("dikshantias");
  const result = await db.collection("admins").insertOne({ name, email, password: hashedPassword });
  return { _id: result.insertedId.toString(), name, email, password: hashedPassword };
}

// Verify password (unchanged)
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
