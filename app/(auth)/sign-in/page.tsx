"use client"

import { AuthForm, type SignInData } from "@/components/auth-form"
import { authClient } from "@/lib/auth-client"

export default function SignInPage() {
  const handleSignIn = async(data: SignInData)=> {
    const { data: singInResponse, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password, 
      rememberMe: true, 
      callbackURL: "/", 
    })
    console.log("Sign in response", singInResponse, error)
    console.log("Sign-in form data:", data)
  }
  

  return <AuthForm mode="sign-in" onSubmit={handleSignIn} notice="" />
}
