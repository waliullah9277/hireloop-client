import { Banknote, Bookmark, BriefcaseBusiness } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Job } from "@/types"

export function JobCard({ job }: { job: Job }) {
  const initials = job.companyName
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
  const amount = (value: number | null) =>
    value == null
      ? "—"
      : new Intl.NumberFormat("en-US", { notation: "compact" }).format(value)
  const frequency =
    { hour: "hr", month: "mo", year: "yr" }[job.frequency] ?? job.frequency

  return (
    <Card className="rounded-xl border-white/10 bg-[#141418] py-0 text-[#ededf0] shadow-none transition-colors hover:border-white/20">
      <CardContent className="flex gap-3 p-4 sm:gap-5 sm:p-6">
        <span
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#222228] text-sm font-semibold text-[#b9b4ff] sm:size-16 sm:text-lg"
        >
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-lg leading-7 font-semibold tracking-tight sm:text-[22px]">
                {job.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-6 text-[#8b8b98] sm:text-base">
                {job.companyName}
                {job.location && (
                  <>
                    {" "}
                    <span aria-hidden="true">•</span> {job.location}
                  </>
                )}
                {job.isRemote && " (Remote)"}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled
              aria-label={`Save ${job.title} (not connected yet)`}
              className="size-8 shrink-0 text-[#a0a0ab] disabled:opacity-60"
            >
              <Bookmark aria-hidden="true" className="size-5" />
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="gap-1.5 rounded-md border-white/10 bg-[#222228] px-2.5 py-1.5 text-xs font-medium text-[#ededf0]"
            >
              <Banknote aria-hidden="true" className="size-3.5" />$
              {amount(job.minSalary)} – ${amount(job.maxSalary)}
              {frequency && (
                <span className="text-[#a0a0ab]"> / {frequency}</span>
              )}
            </Badge>
            <Badge
              variant="outline"
              className="gap-1.5 rounded-md border-white/10 bg-[#222228] px-2.5 py-1.5 text-xs font-medium text-[#ededf0]"
            >
              <BriefcaseBusiness aria-hidden="true" className="size-3.5" />
              {job.jobType}
            </Badge>
            {job.category && (
              <Badge
                variant="outline"
                className="rounded-md border-[#5c53fe]/20 bg-[#5c53fe]/10 px-2.5 py-1.5 text-xs font-medium text-[#b9b4ff]"
              >
                {job.category}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
