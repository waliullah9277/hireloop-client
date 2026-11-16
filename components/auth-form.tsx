"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { ArrowRight, Eye, EyeOff, Shield, UserRound, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type SignInData = { email: string; password: string }
export type SignUpData = SignInData & {
  name: string
  confirmPassword: string
  role: "seeker" | "recruiter" | "admin"
}

type AuthFormProps = {
  notice: string
} & (
  | { mode: "sign-in"; onSubmit: (data: SignInData) => void }
  | { mode: "sign-up"; onSubmit: (data: SignUpData) => void }
)

const inputStyle =
  "h-12 border-white/15 bg-[#101010] px-3 text-white placeholder:text-white/35 focus-visible:border-[#8b83ff] focus-visible:ring-[#5c53fe]/25 md:text-base dark:bg-[#101010]"

export function AuthForm(props: AuthFormProps) {
  const isSignUp = props.mode === "sign-up"
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    // console.log(formData)

    if (props.mode === "sign-up") {
      const name = String(formData.get("name") ?? "").trim()
      const confirmPassword = String(formData.get("confirmPassword") ?? "")
      const role = formData.get("role")
      if (role !== "seeker" && role !== "recruiter" && role !== "admin") {
        setError("Please select a valid role.")
        return
      }
      if (!name) {
        setError("Please enter your full name.")
        return
      }
      if (password !== confirmPassword) {
        setError("Your passwords do not match.")
        const confirmation =
          event.currentTarget.elements.namedItem("confirmPassword")
        if (confirmation instanceof HTMLInputElement) confirmation.focus()
        return
      }
      props.onSubmit({ name, email, password, confirmPassword, role })
    } else {
      props.onSubmit({ email, password })
    }
  }

  return (
    <Card className="gap-6 rounded-2xl border-white/10 bg-[#171719] py-8 text-white shadow-2xl shadow-black/30 sm:py-10">
      <CardHeader className="gap-3 px-6 text-center sm:px-8">
        <p className="text-xs font-medium tracking-[0.2em] text-[#a6a0ff] uppercase">
          Your next chapter starts here
        </p>
        <CardTitle className="text-3xl font-semibold tracking-tight">
          {isSignUp ? "Create your account" : "Welcome back"}
        </CardTitle>
        <CardDescription className="text-base leading-6 text-white/60">
          {isSignUp
            ? "Join HireLoop and find your next opportunity."
            : "Sign in to continue your journey with HireLoop."}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 sm:px-8">
        <nav
          aria-label="Account access"
          className="mb-8 grid grid-cols-2 gap-1 rounded-xl bg-[#101010] p-1"
        >
          {[
            { label: "Sign In", href: "/sign-in", active: !isSignUp },
            { label: "Sign Up", href: "/sign-up", active: isSignUp },
          ].map(({ label, href, active }) => (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`rounded-lg px-4 py-3 text-center text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#a6a0ff] ${active ? "bg-[#5c53fe] text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <fieldset
              className="space-y-3"
              aria-describedby={
                error.includes("role") ? "auth-error" : undefined
              }
            >
              <legend className="text-sm font-medium text-white">
                Joining HireLoop as
              </legend>
              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    { value: "seeker", label: "Job Seeker", Icon: Users },
                    { value: "recruiter", label: "Recruiter", Icon: UserRound },
                    { value: "admin", label: "Admin", Icon: Shield },
                  ] as const
                ).map(({ value, label, Icon }) => (
                  <Label
                    key={value}
                    htmlFor={`role-${value}`}
                    className="flex cursor-pointer flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-[#101010] px-2 py-4 text-sm font-medium text-white/60 transition-colors focus-within:border-[#5c53fe] focus-within:outline-2 focus-within:outline-[#a6a0ff] hover:border-white/25 hover:text-white has-checked:border-[#5c53fe] has-checked:bg-[#5c53fe]/15 has-checked:text-white has-checked:shadow-[0_0_18px_-4px] has-checked:shadow-[#5c53fe]/40"
                  >
                    <Icon
                      className="size-5 shrink-0 text-[#b3abff] has-checked:text-white"
                      aria-hidden="true"
                    />
                    {label}
                    <input
                      id={`role-${value}`}
                      type="radio"
                      name="role"
                      value={value}
                      defaultChecked={value === "seeker"}
                      required
                      className="sr-only"
                    />
                  </Label>
                ))}
              </div>
            </fieldset>
          )}
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Your full name"
                required
                maxLength={100}
                className={inputStyle}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className={inputStyle}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                placeholder={
                  isSignUp ? "Create a password" : "Enter your password"
                }
                required
                minLength={isSignUp ? 8 : undefined}
                aria-describedby={isSignUp ? "password-hint" : undefined}
                className={`${inputStyle} pr-12`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute top-1 right-1 size-10 text-white/60 hover:bg-white/10 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" />
                ) : (
                  <Eye aria-hidden="true" />
                )}
              </Button>
            </div>
            {isSignUp && (
              <p id="password-hint" className="text-xs text-white/50">
                Use at least 8 characters.
              </p>
            )}
          </div>
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  required
                  minLength={8}
                  aria-invalid={error.includes("password") || undefined}
                  aria-describedby={error ? "auth-error" : undefined}
                  onChange={() => setError("")}
                  className={`${inputStyle} pr-12`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  aria-pressed={showConfirmPassword}
                  className="absolute top-1 right-1 size-10 text-white/60 hover:bg-white/10 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff aria-hidden="true" />
                  ) : (
                    <Eye aria-hidden="true" />
                  )}
                </Button>
              </div>
            </div>
          )}
          {error && (
            <p id="auth-error" role="alert" className="text-sm text-red-300">
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="h-12 w-full gap-2 rounded-xl bg-[#5c53fe] text-base font-semibold text-white hover:bg-[#7068ff] focus-visible:ring-[#a6a0ff]"
          >
            {isSignUp ? "Create Account" : "Sign In"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          {props.notice && !error && (
            <p
              role="status"
              className="rounded-lg border border-[#5c53fe]/30 bg-[#5c53fe]/10 p-3 text-sm leading-6 text-[#c3bfff]"
            >
              {props.notice}
            </p>
          )}
        </form>
        <p className="mt-6 text-center text-sm text-white/60">
          {isSignUp ? "Already have an account? " : "New to HireLoop? "}
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="font-medium text-[#aaa3ff] underline-offset-4 hover:underline"
          >
            {isSignUp ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
