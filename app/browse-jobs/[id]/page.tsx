import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowUpRight,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  MapPin,
  Users,
} from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getJobById } from "@/lib/api/jobs"
import { ApplyJobButton } from "../_components/apply-job-button"
import { SaveJobButton } from "../_components/save-job-button"

const panelStyle =
  "rounded-xl border-white/10 bg-[#141418] text-[#ededf0] shadow-none"

const JobDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const job = await getJobById(id)
  if (!job) notFound()

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
    { hour: "hour", month: "month", year: "year" }[job.frequency] ??
    job.frequency
  const deadline = job.deadline ? new Date(job.deadline) : null
  const formattedDeadline =
    deadline && !Number.isNaN(deadline.getTime())
      ? new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        }).format(deadline)
      : "Not specified"

  return (
    <div className="min-h-svh bg-[#08080a] text-[#ededf0]">
      <Navbar />
      <main className="mx-auto max-w-[1400px] px-4 pt-6 pb-16 sm:px-6 lg:px-10 xl:px-20">
        <Link
          href="/browse-jobs"
          className="mb-7 inline-flex min-h-10 items-center gap-2 rounded text-sm text-[#a0a0ab] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#a6a0ff]"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Browse Jobs
        </Link>

        <header className="mb-8 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-start gap-4 sm:items-center sm:gap-6">
            <span
              aria-hidden="true"
              className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#222228] text-xl font-semibold text-[#b9b4ff] sm:size-20 sm:text-2xl"
            >
              {initials}
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                {job.title}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-base text-[#a0a0ab] sm:text-lg">
                <Building2 aria-hidden="true" className="size-4 shrink-0" />
                {job.companyName}
              </p>
              <Badge
                variant="outline"
                className="mt-3 border-[#5c53fe]/25 bg-[#5c53fe]/10 text-[#b9b4ff]"
              >
                {job.category}
              </Badge>
            </div>
          </div>
          <div className="flex shrink-0 gap-3">
            <SaveJobButton jobId={job._id} />
            <ApplyJobButton jobId={job._id} job={job} />
          </div>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:gap-8">
          <div className="min-w-0 space-y-6">
            <Card className={`${panelStyle} py-0`}>
              <CardContent className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
                <Summary
                  label="Salary Range"
                  icon={<Banknote aria-hidden="true" className="size-4" />}
                >
                  ${amount(job.minSalary)} – ${amount(job.maxSalary)}
                  {frequency && (
                    <span className="mt-1 block text-xs font-normal text-[#6e6e78]">
                      per {frequency}
                    </span>
                  )}
                </Summary>
                <Summary
                  label="Location"
                  icon={<MapPin aria-hidden="true" className="size-4" />}
                >
                  {job.location || (job.isRemote ? "Remote" : "Not specified")}
                  {job.isRemote && job.location && (
                    <span className="mt-1 block text-xs font-normal text-[#6e6e78]">
                      Remote available
                    </span>
                  )}
                </Summary>
                <Summary
                  label="Job Type"
                  icon={
                    <BriefcaseBusiness aria-hidden="true" className="size-4" />
                  }
                >
                  {job.jobType}
                </Summary>
                <Summary
                  label="Deadline"
                  icon={<CalendarDays aria-hidden="true" className="size-4" />}
                >
                  {formattedDeadline}
                </Summary>
              </CardContent>
            </Card>

            <Card className={`${panelStyle} gap-0 py-0`}>
              <CardContent className="space-y-9 p-5 sm:p-8">
                <section aria-labelledby="job-description">
                  <h2
                    id="job-description"
                    className="mb-4 text-xl font-semibold"
                  >
                    Job Description
                  </h2>
                  <p className="text-sm leading-7 text-[#a0a0ab]">
                    {job.companyName} is hiring a {job.title} in {job.category}.{" "}
                    {job.isRemote
                      ? "This position supports remote work."
                      : `This position is based in ${job.location || "the company's office"}.`}{" "}
                    Explore the responsibilities and qualifications below.
                  </p>
                </section>
                <TextSection
                  title="Responsibilities"
                  text={job.responsibilities}
                />
                <TextSection title="Requirements" text={job.requirements} />
              </CardContent>
            </Card>
          </div>

          <aside
            aria-label="Company and application information"
            className="space-y-6"
          >
            <Card className={`${panelStyle} gap-0 py-0`}>
              <CardHeader className="px-5 pt-6 sm:px-6">
                <CardTitle className="text-xl font-semibold">
                  Company Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6">
                <div className="mb-6 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#222228] font-semibold text-[#b9b4ff]"
                  >
                    {initials}
                  </span>
                  <p className="text-base font-medium">{job.companyName}</p>
                </div>
                <dl className="divide-y divide-white/10">
                  <CompanyDetail label="Category" value={job.category} />
                  <CompanyDetail
                    label="Location"
                    value={job.location || "Remote"}
                  />
                  <CompanyDetail
                    label="Workplace"
                    value={job.isRemote ? "Remote available" : "On-site"}
                  />
                </dl>
                <Button
                  type="button"
                  variant="outline"
                  disabled
                  className="mt-6 h-11 w-full border-white/10 bg-transparent text-[#a0a0ab] disabled:opacity-70"
                >
                  Visit Website
                  <ArrowUpRight aria-hidden="true" />
                </Button>
              </CardContent>
            </Card>

            <Card className={`${panelStyle} gap-0 py-0`}>
              <CardHeader className="px-5 pt-6 sm:px-6">
                <CardTitle className="text-base font-semibold">
                  Application Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-5 sm:p-6">
                <p className="flex items-center gap-3 text-sm text-[#a0a0ab]">
                  <CalendarDays
                    aria-hidden="true"
                    className="size-4 shrink-0 text-[#8b83ff]"
                  />
                  Apply by {formattedDeadline}
                </p>
                <p className="flex items-center gap-3 text-sm text-[#a0a0ab]">
                  <Users
                    aria-hidden="true"
                    className="size-4 shrink-0 text-[#8b83ff]"
                  />
                  {job.applicants ?? 0} applicants
                </p>
                {job.status && (
                  <Badge
                    variant="outline"
                    className={
                      job.status === "Active"
                        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                        : "border-white/10 bg-white/5 text-[#a0a0ab]"
                    }
                  >
                    {job.status}
                  </Badge>
                )}
                <p className="border-t border-white/10 pt-4 text-xs leading-5 text-[#6e6e78]">
                  Online applications, saved jobs, and company website links
                  will be connected later.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}

function Summary({
  label,
  icon,
  children,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="min-w-0">
      <p className="mb-3 flex items-center gap-2 text-[10px] font-medium tracking-wider text-[#6e6e78] uppercase">
        {icon}
        {label}
      </p>
      <div className="text-sm leading-6 font-medium text-[#ededf0]">
        {children}
      </div>
    </div>
  )
}

function TextSection({ title, text }: { title: string; text: string }) {
  const lines = (text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
  return (
    <section aria-label={title}>
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <ul className="space-y-3">
        {lines.length ? (
          lines.map((line, index) => (
            <li
              key={`${index}-${line}`}
              className="flex gap-3 text-sm leading-7 text-[#a0a0ab]"
            >
              <Check
                aria-hidden="true"
                className="mt-1.5 size-4 shrink-0 text-[#8b83ff]"
              />
              <span>{line.replace(/^[•*-]\s*/, "")}</span>
            </li>
          ))
        ) : (
          <li className="text-sm text-[#6e6e78]">Not specified.</li>
        )}
      </ul>
    </section>
  )
}

function CompanyDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-4">
      <dt className="text-[10px] font-medium tracking-wider text-[#6e6e78] uppercase">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-6 text-[#ededf0]">{value}</dd>
    </div>
  )
}

export default JobDetailPage
