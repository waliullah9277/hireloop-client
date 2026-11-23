"use client"

import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import type { NewApplicationData, NewJobData } from "@/types"
import { ApplyToAJob } from "@/lib/actions/applications"

export function ApplyJobButton({
  jobId,
  job,
}: {
  jobId: string
  job: NewJobData
}) {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const user = session?.user

  const handleApplyJob = async () => {
    if (isPending) return
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${jobId}`)
    } else if (user.role === "seeker") {
      const application: NewApplicationData = {
        jobId,
        userId: user.id,
        email: user.email,
        jobTitle: job.title,
        companyName: job.companyName,
        appliedAt: new Date().toISOString(),
        status: "Applied",
        jobType: job.jobType,
        location: job.location || (job.isRemote ? "Remote" : "Not specified"),
      }
      const result = await ApplyToAJob(application)
      if (result.insertedId) {
        console.log("Application submitted successfully")
        router.push("/browse-jobs")
      }
    }
  }

  return (
    <Button
      type="button"
      data-job-id={jobId}
      onClick={handleApplyJob}
      disabled={isPending}
      className="h-12 flex-1 rounded-lg bg-[#5c53fe] px-7 text-base font-semibold text-white hover:bg-[#7068ff] sm:flex-none"
    >
      <Send aria-hidden="true" />
      Apply Now
    </Button>
  )
}
