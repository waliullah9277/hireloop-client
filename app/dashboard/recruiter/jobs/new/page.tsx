"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { BriefcaseBusiness, ChevronRight, MapPin, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createJobs } from "@/lib/actions/jobs/page"

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
}

const control =
  "h-11 border-white/10 bg-[#18181d] text-white placeholder:text-white/35 focus-visible:border-[#7770ff] focus-visible:ring-[#5c53fe]/25 dark:bg-[#18181d]"
const selectStyle =
  "w-full [&_select]:h-11 [&_select]:border-white/10 [&_select]:bg-[#18181d] [&_select]:text-white [&_select]:focus-visible:ring-[#5c53fe]/25"

export default function AddJobPage() {
  const [isRemote, setIsRemote] = useState(false)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSubmitted(false)
    const formData = new FormData(event.currentTarget)
    const text = (name: string) => String(formData.get(name) ?? "").trim()
    const number = (name: string) =>
      text(name) === "" ? null : Number(text(name))

    // All form values are collected here. Pass this object to your API later.
    const jobData: NewJobData = {
      title: text("title"),
      companyName: text("companyName"),
      category: text("category"),
      jobType: text("jobType"),
      isRemote,
      location: text("location"),
      deadline: text("deadline"),
      minSalary: number("minSalary"),
      maxSalary: number("maxSalary"),
      frequency: text("frequency"),
      responsibilities: text("responsibilities"),
      requirements: text("requirements"),
    }

    if (
      !jobData.title ||
      !jobData.companyName ||
      !jobData.responsibilities ||
      !jobData.requirements ||
      (!isRemote && !jobData.location)
    ) {
      setError("Please fill in all required fields.")
      return
    }
    if (
      jobData.minSalary !== null &&
      jobData.maxSalary !== null &&
      jobData.maxSalary < jobData.minSalary
    ) {
      setError(
        "Maximum salary must be greater than or equal to minimum salary."
      )
      return
    }
    console.log("New job form data:", jobData)
    // TODO: await fetch("/api/jobs", { method: "POST", ... })
    const result = await createJobs(jobData)
    setSubmitted(true)

    console.log(result)
  }

  return (
    <div className="min-h-svh w-full bg-[#0b0b0f] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[984px]">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs text-white/50"
        >
          <Link href="/dashboard/recruiter/jobs" className="hover:text-white">
            Manage Jobs
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span aria-current="page" className="text-white/80">
            Create New Listing
          </span>
        </nav>

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Post a New Job
            </h1>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>
        </div>

        <form
          id="new-job-form"
          onSubmit={handleSubmit}
          onChange={() => {
            setError("")
            setSubmitted(false)
          }}
          className="space-y-6"
        >
          <JobSection title="1. Basic Information">
            <Field label="Job Title *" htmlFor="title">
              <Input
                id="title"
                name="title"
                placeholder="e.g. Frontend Developer"
                required
                maxLength={150}
                className={control}
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Company Name *" htmlFor="companyName">
                <div className="relative">
                  <BriefcaseBusiness
                    className="absolute top-3 left-3 size-5 text-white/40"
                    aria-hidden="true"
                  />
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Your company name"
                    required
                    className={`${control} pl-10`}
                  />
                </div>
              </Field>
              <Field label="Job Category *" htmlFor="category">
                <NativeSelect
                  id="category"
                  name="category"
                  required
                  defaultValue=""
                  className={selectStyle}
                >
                  <NativeSelectOption value="" disabled>
                    Select a category
                  </NativeSelectOption>
                  {[
                    "Engineering & Tech",
                    "Design & Creative",
                    "Product & Management",
                    "Marketing & Sales",
                    "Finance & Accounting",
                    "Customer Support",
                    "Other",
                  ].map((category) => (
                    <NativeSelectOption key={category} value={category}>
                      {category}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>
            </div>
            <fieldset>
              <legend className="mb-3 text-sm font-medium">Job Type *</legend>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["Full-time", "Part-time", "Contract", "Internship"].map(
                  (type) => (
                    <Label
                      key={type}
                      className="flex min-h-11 cursor-pointer justify-center rounded-lg border border-white/10 bg-[#18181d] px-3 text-sm text-white/60 has-checked:border-[#7770ff] has-checked:bg-[#5c53fe]/15 has-checked:text-[#b9b4ff] has-focus-visible:ring-2 has-focus-visible:ring-[#a6a0ff]"
                    >
                      <input
                        type="radio"
                        name="jobType"
                        value={type}
                        defaultChecked={type === "Full-time"}
                        required
                        className="sr-only"
                      />
                      {type}
                    </Label>
                  )
                )}
              </div>
            </fieldset>
          </JobSection>

          <JobSection title="2. Location, Compensation & Timeline">
            <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#18181d]/50 p-4">
              <div>
                <Label htmlFor="isRemote">Remote Work Allowed</Label>
                <p
                  id="remote-hint"
                  className="mt-1 text-xs leading-5 text-white/45"
                >
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
              <Switch
                id="isRemote"
                checked={isRemote}
                onCheckedChange={(checked) => {
                  setIsRemote(checked)
                  setSubmitted(false)
                }}
                aria-describedby="remote-hint"
                className="data-checked:bg-[#5c53fe] data-unchecked:bg-white/20"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={`Job Location${isRemote ? " (optional)" : " *"}`}
                htmlFor="location"
              >
                <div className="relative">
                  <MapPin
                    className="absolute top-3 left-3 size-5 text-white/40"
                    aria-hidden="true"
                  />
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. New York, USA"
                    required={!isRemote}
                    className={`${control} pl-10`}
                  />
                </div>
              </Field>
              <Field label="Application Deadline *" htmlFor="deadline">
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  required
                  className={`${control} scheme-dark`}
                />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="Min Salary / Rate" htmlFor="minSalary">
                <Input
                  id="minSalary"
                  name="minSalary"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 50000"
                  className={control}
                />
              </Field>
              <Field label="Max Salary / Rate" htmlFor="maxSalary">
                <Input
                  id="maxSalary"
                  name="maxSalary"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 80000"
                  className={control}
                />
              </Field>
              <Field label="Frequency" htmlFor="frequency">
                <NativeSelect
                  id="frequency"
                  name="frequency"
                  defaultValue="year"
                  className={selectStyle}
                >
                  <NativeSelectOption value="hour">per hour</NativeSelectOption>
                  <NativeSelectOption value="month">
                    per month
                  </NativeSelectOption>
                  <NativeSelectOption value="year">per year</NativeSelectOption>
                </NativeSelect>
              </Field>
            </div>
          </JobSection>

          <JobSection title="3. Responsibilities & Requirements">
            <Field label="Key Responsibilities *" htmlFor="responsibilities">
              <Textarea
                id="responsibilities"
                name="responsibilities"
                required
                rows={5}
                placeholder="Describe the role and what the candidate will work on..."
                className={`${control} h-auto min-h-32 resize-y p-3`}
              />
            </Field>
            <Field
              label="Qualifications & Requirements *"
              htmlFor="requirements"
            >
              <Textarea
                id="requirements"
                name="requirements"
                required
                rows={5}
                placeholder={
                  "List the skills and experience needed:\n• Experience with React and TypeScript\n• Strong communication skills"
                }
                className={`${control} h-auto min-h-32 resize-y p-3`}
              />
            </Field>
          </JobSection>
          {error && (
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
          )}
          {/* {submitted && (
            <p
              role="status"
              className="rounded-lg border border-[#5c53fe]/30 bg-[#5c53fe]/10 p-4 text-sm text-[#b9b4ff]"
            >
              Form data collected — check your browser console. No job has been
              published yet.
            </p>
          )} */}
          <div className="flex justify-end gap-3 pb-4">
            <Button
              nativeButton={false}
              render={<Link href="/dashboard/recruiter/jobs" />}
              variant="ghost"
              className="h-11 text-white/60 hover:bg-white/10 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 bg-[#5c53fe] px-6 text-white hover:bg-[#7068ff]"
            >
              <Send aria-hidden="true" />
              Publish Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-sm text-white/80">
        {label}
      </Label>
      {children}
    </div>
  )
}

function JobSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Card className="gap-0 rounded-xl border-white/10 bg-[#111115] py-0 text-white shadow-none">
      <CardHeader className="border-b border-white/10 px-5 py-5 sm:px-6">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-5 sm:p-6">{children}</CardContent>
    </Card>
  )
}
