import { NextResponse } from "next/server"
import * as jose from "jose"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables")
}

// Move getToken to a separate utility file
async function verifyToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return payload
  } catch (error) {
    console.error("JWT verification error:", error)
    return null
  }
}

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const payload = await verifyToken(token)
  if (payload) {
    return NextResponse.json(payload)
  } else {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}

export async function POST(request: Request) {
  const { username, password } = await request.json()

  // Here, implement your login logic (e.g., check credentials against database)
  // For this example, we'll use a dummy check
  if (username === "admin" && password === "password") {
    const token = await new jose.SignJWT({ username, roles: ["admin"] })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(JWT_SECRET))

    const response = NextResponse.json({ success: true })
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7200, // 2 hours
      path: "/",
    })

    return response
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}

