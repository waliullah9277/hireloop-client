"use client"

import { useState } from "react"
import { AuthForm, type SignUpData } from "@/components/auth-form"

export default function SignUpPage() {
  const [notice, setNotice] = useState("")

  function handleSignUp(data: SignUpData) {
    // TODO: Connect your registration API here using data.name, data.email,
    // and data.password. confirmPassword is only needed for client validation.
    void data
    setNotice("Form data collected. Account creation will be connected later.")
  }

  return <AuthForm mode="sign-up" onSubmit={handleSignUp} notice={notice} />
}
