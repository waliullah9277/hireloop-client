import Link from "next/link"
import {
  BriefcaseBusiness,
  ChevronRight,
  MapPin,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { NewJobData } from "./new/page"
import { getJobs } from "@/lib/api/jobs"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"

export type Job = NewJobData & {
  _id: string
  applicants: number
  status: "Active" | "Expired"
  posted: string
}



function compensation(job: Job) {
  const amount = (value: number | null) =>
    value === null
      ? "—"
      : new Intl.NumberFormat("en-US", { notation: "compact" }).format(value)
  const frequency =
    { hour: "hr", month: "mo", year: "yr" }[job.frequency] ?? job.frequency
  return `$${amount(job.minSalary)} – $${amount(job.maxSalary)} / ${frequency}`
}

export default async function ManageJobPage() {

  const jobs: Job[] = await getJobs()

  return (
    <div className="min-h-svh w-full bg-[#0b0b0f] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs text-white/45"
        >
          <span>Manage Jobs</span>
          <ChevronRight aria-hidden="true" className="size-3.5" />
          <span aria-current="page" className="text-white/75">
            Job Listings &amp; Postings
          </span>
        </nav>

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Manage Job Posts
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/dashboard/recruiter/jobs/new" />}
            className="h-11 shrink-0 rounded-lg bg-[#5c53fe] px-5 text-white hover:bg-[#7068ff]"
          >
            <Plus aria-hidden="true" /> New Job Post
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111115]">
          <Table className="min-w-[1180px]">
            <TableHeader className="bg-[#18181d]">
              <TableRow className="border-white/10 hover:bg-transparent">
                {[
                  "Job Title & Dept",
                  "Company & Location",
                  "Type",
                  "Compensation",
                  "Applicants",
                  "Status",
                  "Deadline",
                  "Actions",
                ].map((heading) => (
                  <TableHead
                    key={heading}
                    className="h-12 px-5 text-[10px] font-semibold tracking-wider text-white/45 uppercase"
                  >
                    {heading}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow
                  key={job._id}
                  className="border-white/8 hover:bg-white/[0.025]"
                >
                  <TableCell className="px-5 py-6">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#5c53fe]/20 bg-[#5c53fe]/10 text-[#a6a0ff]">
                        <BriefcaseBusiness
                          aria-hidden="true"
                          className="size-4"
                        />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white/95">
                          {job.title}
                        </p>
                        <p className="mt-1.5 text-xs text-white/40">
                          {job.category}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-6">
                    <p className="text-sm text-white/85">{job.companyName}</p>
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-white/40">
                      <MapPin aria-hidden="true" className="size-3" />
                      {job.isRemote ? `Remote (${job.location})` : job.location}
                    </p>
                  </TableCell>
                  <TableCell className="px-5 py-6">
                    <Badge
                      variant="outline"
                      className="rounded-md border-white/10 bg-white/5 px-2 py-1 text-xs font-normal text-white/65"
                    >
                      {job.jobType}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-6 text-sm text-white/80">
                    {compensation(job)}
                  </TableCell>
                  <TableCell className="px-5 py-6">
                    <span className="flex items-center gap-1.5 text-xs text-[#b3adff]">
                      <Users aria-hidden="true" className="size-3.5" />
                      {job.applicants} Candidates
                    </span>
                  </TableCell>
                  <TableCell className="px-5 py-6">
                    <Badge
                      variant="outline"
                      className={
                        job.status === "Active"
                          ? "gap-1.5 rounded-full border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                          : "gap-1.5 rounded-full border-white/10 bg-white/5 text-white/45"
                      }
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-current"
                      />
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-6">
                    <p className="text-xs text-white/75">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        timeZone: "UTC",
                      }).format(new Date(`${job.deadline}T00:00:00Z`))}
                    </p>
                    <p className="mt-1.5 text-[11px] text-white/35">
                      {job.posted}
                    </p>
                  </TableCell>
                  <TableCell className="px-5 py-6">
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        disabled
                        aria-label={`Update ${job.title} (coming soon)`}
                        size="icon"
                        className="size-8 text-white/65 disabled:opacity-60"
                      >
                        <Pencil aria-hidden="true" className="size-3.5" />
                      </Button>
                      <DeleteJobDialog job={job}/>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled
                        aria-label={`More actions for ${job.title} (coming soon)`}
                        className="size-8 text-white/65 disabled:opacity-60"
                      >
                        <MoreHorizontal aria-hidden="true" className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="border-t border-white/10 px-5 py-4 text-xs text-white/40">
            Showing {jobs.length} job posts · Sample data
          </div>
        </div>
      </div>
    </div>
  )
}
