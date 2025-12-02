import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { username, password } = await req.json()

  const loginRes = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })

  const data = await loginRes.json()
  const token = data.access_token

  if (!token) {
    return NextResponse.json({ error: "Login failed" }, { status: 401 })
  }

  const res = NextResponse.json({ message: "Logged in successfully" })
  res.cookies.set("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 2 * 24 * 60 * 60, // 2 days in seconds
  })

  return res
}
