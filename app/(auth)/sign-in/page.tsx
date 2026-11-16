"use client"

import { useState } from "react"
import { AuthForm, type SignInData } from "@/components/auth-form"

export default function SignInPage() {
  const [notice, setNotice] = useState("")

  function handleSignIn(data: SignInData) {
    // TODO: Connect your sign-in API here using data.email and data.password.
    void data
    setNotice(
      "Form data collected. Sign-in functionality will be connected later."
    )
  }

  return <AuthForm mode="sign-in" onSubmit={handleSignIn} notice={notice} />
}
