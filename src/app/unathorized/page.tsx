import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="mb-4">You do not have permission to access this page.</p>
      <Link href="/menu" className="text-blue-500 hover:underline">
        Return to Menu
      </Link>
    </div>
  )
}