import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Search,
  TrendingUp,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { ApplicationStatus } from "@/types"
import { getApplications } from "@/lib/actions/applications"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"


const statusStyles: Record<ApplicationStatus, string> = {
  Applied: "border-blue-400/20 bg-blue-400/10 text-blue-300",
  "Under Review": "border-amber-400/20 bg-amber-400/10 text-amber-300",
  Shortlisted: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  "Interview Scheduled": "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  Rejected: "border-red-400/20 bg-red-400/10 text-red-300",
  Offered: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
}

export default async function SeekerApplicationsPage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const applications = await getApplications(`applicantId=${session?.user.id}`)


  const total = applications.length
  const shortlisted = applications.filter(
    (item) => item.status === "Shortlisted"
  ).length
  const interviews = applications.filter(
    (item) => item.status === "Interview Scheduled"
  ).length
  const offers = applications.filter((item) => item.status === "Offered").length
  const stats = [
    {
      label: "Total Applied",
      value: total,
      icon: FileText,
      color: "text-[#a6a0ff] bg-[#5c53fe]/10",
    },
    {
      label: "Shortlisted",
      value: shortlisted,
      icon: CheckCheck,
      color: "text-emerald-300 bg-emerald-400/10",
    },
    {
      label: "Interviews",
      value: interviews,
      icon: CalendarDays,
      color: "text-blue-300 bg-blue-400/10",
    },
    {
      label: "Success Rate",
      value: `${total ? Math.round((offers / total) * 100) : 0}%`,
      icon: TrendingUp,
      color: "text-amber-300 bg-amber-400/10",
    },
  ]

  return (
    <div className="min-h-svh w-full bg-[#0b0b0f] px-4 py-6 text-[#ededf0] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              My Applications
            </h1>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Track your job applications and interview progress in real-time.
            </p>
          </div>
          <div className="relative w-full xl:max-w-xs">
            <Search
              aria-hidden="true"
              className="absolute top-3.5 left-3.5 size-4 text-white/35"
            />
            <label htmlFor="application-search" className="sr-only">
              Search applications (coming soon)
            </label>
            <Input
              id="application-search"
              disabled
              placeholder="Search applications..."
              className="h-11 rounded-lg border-white/10 bg-[#141418] pl-10 text-white placeholder:text-white/35 disabled:opacity-70 dark:bg-[#141418]"
            />
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <Card
              key={label}
              className="rounded-xl border-white/10 bg-[#141418] py-0 text-white shadow-none"
            >
              <CardContent className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="text-xs font-medium text-white/45">{label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight">
                    {value}
                  </p>
                </div>
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${color}`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div
            className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#141418] p-1"
            aria-label="Application views"
          >
            <span className="rounded-md bg-[#5c53fe] px-5 py-2 text-sm font-medium text-white">
              Active
            </span>
            <Button
              type="button"
              variant="ghost"
              disabled
              className="h-9 px-5 text-sm text-white/45 disabled:opacity-60"
            >
              Archived
            </Button>
          </div>
          <Button
            type="button"
            variant="outline"
            disabled
            className="h-10 gap-2 border-white/10 bg-[#141418] text-white/65 disabled:opacity-60"
          >
            <Download aria-hidden="true" className="size-4" />
            Export PDF
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#141418]">
          <Table className="min-w-[760px]">
            <TableHeader className="bg-white/[0.025]">
              <TableRow className="border-white/10 hover:bg-transparent">
                {["Job Title", "Company", "Applied", "Status", "Action"].map(
                  (heading) => (
                    <TableHead
                      key={heading}
                      className="h-12 px-5 text-xs font-medium text-white/45 last:text-right sm:px-6"
                    >
                      {heading}
                    </TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow
                  key={application._id}
                  className="border-white/8 hover:bg-white/[0.025]"
                >
                  <TableCell className="px-5 py-5 sm:px-6">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#222228] text-[#a6a0ff]">
                        <BriefcaseBusiness
                          aria-hidden="true"
                          className="size-4"
                        />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-[#ededf0]">
                          {application.jobTitle}
                        </p>
                        <p className="mt-1.5 text-xs text-white/40">
                          {application.jobType}{" "}
                          <span aria-hidden="true">•</span>{" "}
                          {application.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-5 text-sm text-white/65 sm:px-6">
                    {application.companyName}
                  </TableCell>
                  <TableCell className="px-5 py-5 text-xs text-white/45 sm:px-6">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "UTC",
                    }).format(new Date(application.appliedAt))}
                  </TableCell>
                  <TableCell className="px-5 py-5 sm:px-6">
                    <Badge
                      variant="outline"
                      className={`gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${statusStyles[application.status]}`}
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-current"
                      />
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-5 text-right sm:px-6">
                    <Button
                      type="button"
                      variant="ghost"
                      disabled
                      aria-label={`Details for ${application.jobTitle} (coming soon)`}
                      className="h-8 gap-1 text-xs text-white/65 disabled:opacity-60"
                    >
                      Details
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4 sm:px-6">
            <p className="text-xs text-white/40">
              Showing 1–{total} of {total} applications
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                disabled
                aria-label="Previous page"
                className="size-8 text-white/40"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </Button>
              <span
                aria-current="page"
                className="flex size-8 items-center justify-center rounded-lg bg-[#5c53fe] text-xs font-medium text-white"
              >
                1
              </span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                disabled
                aria-label="Next page"
                className="size-8 text-white/40"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-white/30">
          Preview data only. Your application data and actions will be connected
          later.
        </p>
      </div>
    </div>
  )
}
