"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Lock } from "lucide-react"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { FaSquareFacebook } from "react-icons/fa6"
import { FaSquareXTwitter } from "react-icons/fa6"
import { FaLinkedin } from "react-icons/fa"
import { FaMicrosoft } from "react-icons/fa"
import { useAuth } from "@/contexts/auth-context"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGithubLoading, setIsGithubLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isFBLoading, setIsFBLoading] = useState(false)
  const [isTwitterLoading, setIsTwitterLoading] = useState(false)
  const [isLinkedinLoading, setIsLinkedinLoading] = useState(false)
  const [isAzureLoading, setIsAzureLoading] = useState(false)
  const router = useRouter()
  const { signIn, signInWithOAuth } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await signIn(email, password)

      if (error) {
        setError(error.message)
        return
      }

      // Successful login - navigate to account page
      router.push("/home")
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGitHubLogin = async () => {
    setIsGithubLoading(true)
    setError(null)

    try {
      await signInWithOAuth("github")
    } catch (err) {
      console.error("GitHub login error:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsGithubLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    setError(null)

    try {
      await signInWithOAuth("google")
    } catch (err) {
      console.error("Google login error:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleFBLogin = async () => {
    setIsFBLoading(true)
    setError(null)

    try {
      await signInWithOAuth("facebook")
    } catch (err) {
      console.error("Facebook login error:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsFBLoading(false)
    }
  }

  const handleTwitterLogin = async () => {
    setIsTwitterLoading(true)
    setError(null)

    try {
      await signInWithOAuth("twitter")
    } catch (err) {
      console.error("Twitter login error:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsTwitterLoading(false)
    }
  }

  const handleLinkedinLogin = async () => {
    setIsLinkedinLoading(true)
    setError(null)

    try {
      await signInWithOAuth("linkedin_oidc")
    } catch (err) {
      console.error("Linkedin login error:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsLinkedinLoading(false)
    }
  }

  const handleAzureLogin = async () => {
    setIsAzureLoading(true)
    setError(null)

    try {
      await signInWithOAuth("azure")
    } catch (err) {
      console.error("Microsoft login error:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsAzureLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left side with background image and gradient overlay */}
      <div className="hidden lg:flex lg:w-1/2 auth-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300/90 to-gray-100/90 flex flex-col justify-between p-12 text-gray-600">
          <div>
            <h2 className="text-4xl font-light mb-2"></h2>
            <h1 className="text-6xl font-bold"></h1>
          </div>
          <div className="text-lg font-bold">
            <h1 className="text-4xl font-bold">JPhil's Template</h1>
          </div>
          <div className="text-lg font-bold"></div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-600">LOGIN</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="relative">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 py-5 sm:py-6 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            <div className="relative">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 py-5 sm:py-6 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="flex items-center justify-end">
              {/* <Link
                href="/forgot-password"
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                Forgot Password?
              </Link> */}
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-700 text-white py-5 sm:py-6 rounded-full"
              disabled={
                isGithubLoading ||
                isGoogleLoading ||
                isFBLoading ||
                isTwitterLoading ||
                isLinkedinLoading ||
                isAzureLoading ||
                isLoading
              }
            >
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </Button>

            {/* Social login buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full py-5 sm:py-6 rounded-full flex items-center justify-center gap-2"
                onClick={handleGitHubLogin}
                disabled={
                  isGithubLoading ||
                  isGoogleLoading ||
                  isFBLoading ||
                  isTwitterLoading ||
                  isLinkedinLoading ||
                  isAzureLoading ||
                  isLoading
                }
              >
                <AiFillGithub size={24} className="h-5 w-5" />
                <span className="hidden sm:inline">GITHUB</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full py-5 sm:py-6 rounded-full flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
                disabled={
                  isGithubLoading ||
                  isGoogleLoading ||
                  isFBLoading ||
                  isTwitterLoading ||
                  isLinkedinLoading ||
                  isAzureLoading ||
                  isLoading
                }
              >
                <FcGoogle size={24} className="h-5 w-5" />
                <span className="hidden sm:inline">GOOGLE</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full py-5 sm:py-6 rounded-full flex items-center justify-center gap-2"
                onClick={handleFBLogin}
                disabled={
                  isGithubLoading ||
                  isGoogleLoading ||
                  isFBLoading ||
                  isTwitterLoading ||
                  isLinkedinLoading ||
                  isAzureLoading ||
                  isLoading
                }
              >
                <FaSquareFacebook size={24} className="h-5 w-5" />
                <span className="hidden sm:inline">FACEBOOK</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full py-5 sm:py-6 rounded-full flex items-center justify-center gap-2"
                onClick={handleTwitterLogin}
                disabled={
                  isGithubLoading ||
                  isGoogleLoading ||
                  isFBLoading ||
                  isTwitterLoading ||
                  isLinkedinLoading ||
                  isAzureLoading ||
                  isLoading
                }
              >
                <FaSquareXTwitter size={24} className="h-5 w-5" />
                <span className="hidden sm:inline">TWITTER</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full py-5 sm:py-6 rounded-full flex items-center justify-center gap-2"
                onClick={handleLinkedinLogin}
                disabled={
                  isGithubLoading ||
                  isGoogleLoading ||
                  isFBLoading ||
                  isTwitterLoading ||
                  isLinkedinLoading ||
                  isAzureLoading ||
                  isLoading
                }
              >
                <FaLinkedin size={24} className="h-5 w-5" />
                <span className="hidden sm:inline">LINKEDIN</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full py-5 sm:py-6 rounded-full flex items-center justify-center gap-2"
                onClick={handleAzureLogin}
                disabled={
                  isGithubLoading ||
                  isGoogleLoading ||
                  isFBLoading ||
                  isTwitterLoading ||
                  isLinkedinLoading ||
                  isAzureLoading ||
                  isLoading
                }
              >
                <FaMicrosoft size={24} className="h-5 w-5" />
                <span className="hidden sm:inline">MICROSOFT</span>
              </Button>
            </div>

            <div className="text-center">
              <span className="text-gray-600">Don`t have an account?</span>{" "}
              <Link href="/register" className="text-gray-600 hover:text-gray-700 font-medium">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

