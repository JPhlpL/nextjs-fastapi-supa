import { NextResponse } from "next/server"
import { createClient } from '@/utils/supabase/server'
import { getData } from '@/utils/helpers'

interface Role {
  id: string
  title: string
}

export async function GET() {
  const supabase = await createClient()
  
  // Get the current user from Supabase
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }
  
  try {
    // Fetch additional user data from your database if needed
    // For example, fetch roles
    const roles = await getData<Role[]>({
      url: `${process.env.NEXT_PUBLIC_API_URL}/role/get-roles-by-user/${user.id}`,
    });
    
    // Return combined data
    return NextResponse.json({
      id: user.id,
      email: user.email,
      roles: roles,
      isAdmin: roles.some(role => role.title.toLowerCase() === 'admin'),
      // Add any other user properties you need
    })
  } catch (error) {
    console.error("Error fetching additional user data:", error)
    
    // Return just the basic user data if additional data fetch fails
    return NextResponse.json({
      id: user.id,
      email: user.email,
      roles: [],
      isAdmin: false,
    })
  }
}

// The POST method is no longer needed as Supabase handles authentication
// You can remove it or keep it as a fallback during transition
export async function POST(request: Request) {
  return NextResponse.json(
    { error: "This endpoint is deprecated. Please use Supabase authentication." }, 
    { status: 400 }
  )
}