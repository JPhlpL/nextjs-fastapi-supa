import { cookies } from "next/headers"
import * as jose from "jose"

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables")
}

export const getToken = async () => {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return null // Return null if no token is found
  }

  try {
    // Verify the token and return the payload
    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return payload // Return the payload if verification is successful
  } catch (error) {
    console.error("JWT verification error:", error)
    return null // Return null if verification fails
  }
}

