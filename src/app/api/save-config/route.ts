import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "@/lib/encryption"; // You'll need to implement this
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { apiKey, provider } = await req.json();

  if (!apiKey || !provider) {
    return NextResponse.json({ error: "Invalid configuration" }, { status: 400 });
  }

  // Encrypt the API key before storing it
  const encryptedApiKey = encrypt(apiKey);

  // Store the encrypted API key and provider in a secure, HTTP-only cookie
  cookies().set('api_config', JSON.stringify({ apiKey: encryptedApiKey, provider }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });

  return NextResponse.json({ success: true });
}