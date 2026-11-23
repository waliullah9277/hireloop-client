export type Role = "seeker" | "recruiter" | "admin"

export type SignInData = {
  email: string
  password: string
}

export type SignUpData = SignInData & {
  name: string
  confirmPassword: string
  role: Role
}
