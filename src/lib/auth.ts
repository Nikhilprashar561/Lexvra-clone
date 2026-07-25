import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Admin } from "@/lib/models/admin.model";
import { connectDB } from "@/lib/db";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "admin-secret-key";
const TOKEN_NAME = "accessToken";

export interface AdminPayload {
  id: string;
  email: string;
}

export function signAdminToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch (error) {
    return null;
  }
}

export async function getAuthenticatedAdmin() {
  await connectDB();
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  if (!token) {
    return null;
  }

  const decoded = verifyAdminToken(token);
  if (!decoded || !decoded.id) {
    return null;
  }

  const admin = await Admin.findById(decoded.id).select("-code");
  return admin;
}
