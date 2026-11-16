"use client"

import { AuthForm, type SignUpData } from "@/components/auth-form"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = async (data: SignUpData) => {
    console.log("Sign-up form data:", data)

    const { data: signUpResponse, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,

      callbackURL: "/",
    })
    console.log("Sign Up Data Response", signUpResponse, error)
    if(!error){
      router.refresh();
      router.push("/")
    }
  }

  return <AuthForm mode="sign-up" onSubmit={handleSignUp} notice="" />
}
