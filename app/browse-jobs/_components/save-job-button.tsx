"use client"

import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SaveJobButton({ jobId }: { jobId: string }) {
  function handleSaveJob() {
    // TODO: Implement saving jobId.
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      data-job-id={jobId}
      onClick={handleSaveJob}
      aria-label="Save job"
      className="size-12 rounded-lg border-white/10 bg-[#141418] text-[#a0a0ab] hover:bg-white/10 hover:text-white"
    >
      <Bookmark aria-hidden="true" className="size-5" />
    </Button>
  )
}
