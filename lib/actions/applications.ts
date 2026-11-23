import type { NewApplicationData } from "@/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"


// GET /applications?userId=… — placeholder until loading is wired.
export const getApplications = async (query = ""): Promise<NewApplicationData[]> => {
  const res = await fetch(`${BASE_URL}/applications?${query}`)
  return res.json()
}

export const ApplyToAJob = async (data: NewApplicationData) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return res.json()
}
