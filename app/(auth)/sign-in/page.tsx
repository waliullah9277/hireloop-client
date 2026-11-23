"use client"

import { AuthForm } from "@/components/auth-form"
import type { SignInData } from "@/types"
import { authClient } from "@/lib/auth-client"
import { useSearchParams } from "next/navigation"

export default function SignInPage() {

  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") ?? "/"

  const handleSignIn = async(data: SignInData)=> {
    const { data: singInResponse, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: redirectTo,
    })
    console.log("Sign in response", singInResponse, error)
    console.log("Sign-in form data:", data)
  }
  

  return <AuthForm mode="sign-in" onSubmit={handleSignIn} notice="" />
}
