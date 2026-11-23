export type NewJobData = {
  title: string
  companyName: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: number | null
  maxSalary: number | null
  frequency: string
  responsibilities: string
  requirements: string
  applicants: number
  status: "Active" | "Expired"
}

export type Job = NewJobData & {
  _id: string
  posted: string
}
