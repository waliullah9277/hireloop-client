export type NewApplicationData = {
  _id: string
  jobId: string
  userId: string
  email: string
  jobTitle: string
  companyName: string
  appliedAt: string
  status: ApplicationStatus
  jobType: string
  location: string
}

export type ApplicationStatus =
  | "Applied"
  | "Under Review"
  | "Shortlisted"
  | "Interview Scheduled"
  | "Rejected"
  | "Offered"


