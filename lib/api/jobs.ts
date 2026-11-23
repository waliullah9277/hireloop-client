import { Job } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getJobs = async(query='')=>{
  const res = await fetch(`${BASE_URL}/jobs?${query}`)
  return res.json()
}

export const getJobById = async (jobId: string): Promise<Job | null> => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Unable to load job (HTTP ${res.status}).`)
  return res.json()
}
