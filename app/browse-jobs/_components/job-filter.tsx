"use client"

import { SlidersHorizontal } from "lucide-react"
import { Label } from "@/components/ui/label"
import type { Job } from "@/types"

type JobFilterProps = {
  jobs: Job[]
  category: string
  jobType: string
  onCategoryChange: (value: string) => void
  onJobTypeChange: (value: string) => void
}

export function JobFilter({
  jobs,
  category,
  jobType,
  onCategoryChange,
  onJobTypeChange,
}: JobFilterProps) {
  const categories = [
    ...new Set(jobs.map((job) => job.category).filter(Boolean)),
  ]
  const jobTypes = [...new Set(jobs.map((job) => job.jobType).filter(Boolean))]

  return (
    <aside
      aria-labelledby="job-filter-heading"
      className="self-start rounded-xl border border-white/10 bg-[#141418] p-5 sm:p-6"
    >
      <h2
        id="job-filter-heading"
        className="mb-6 flex items-center gap-2 text-[22px] font-semibold"
      >
        <SlidersHorizontal
          aria-hidden="true"
          className="size-5 text-[#a0a0ab]"
        />
        Filters
      </h2>
      <fieldset>
        <legend className="mb-4 text-base font-semibold">Job Type</legend>
        <div className="space-y-3">
          <Label className="flex min-h-8 cursor-pointer items-center gap-3 text-[13px] font-medium text-[#a0a0ab]">
            <input
              type="checkbox"
              name="jobType"
              value=""
              checked={jobType === ""}
              onChange={() => onJobTypeChange("")}
              className="size-4 shrink-0 accent-[#5c53fe]"
            />
            All types
            <span className="ml-auto text-xs text-[#6e6e78]">
              {jobs.length}
            </span>
          </Label>
          {jobTypes.map((type) => (
            <Label
              key={type}
              className="flex min-h-8 cursor-pointer items-center gap-3 text-[13px] font-medium text-[#a0a0ab]"
            >
              <input
                type="checkbox"
                name="jobType"
                value={type}
                checked={jobType === type}
                onChange={(event) =>
                  onJobTypeChange(event.target.checked ? type : "")
                }
                className="size-4 shrink-0 accent-[#5c53fe]"
              />
              {type}
              <span className="ml-auto text-xs text-[#6e6e78]">
                {jobs.filter((job) => job.jobType === type).length}
              </span>
            </Label>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-6 border-t border-white/10 pt-6">
        <legend className="sr-only">Category</legend>
        <p aria-hidden="true" className="mb-4 text-base font-semibold">
          Category
        </p>
        <div className="space-y-3">
          <Label className="flex min-h-8 cursor-pointer items-center gap-3 text-[13px] font-medium text-[#a0a0ab]">
            <input
              type="checkbox"
              name="category"
              value=""
              checked={category === ""}
              onChange={() => onCategoryChange("")}
              className="size-4 shrink-0 accent-[#5c53fe]"
            />
            All categories
            <span className="ml-auto text-xs text-[#6e6e78]">
              {jobs.length}
            </span>
          </Label>
          {categories.map((item) => (
            <Label
              key={item}
              className="flex min-h-8 cursor-pointer items-center gap-3 text-[13px] font-medium text-[#a0a0ab]"
            >
              <input
                type="checkbox"
                name="category"
                value={item}
                checked={category === item}
                onChange={(event) =>
                  onCategoryChange(event.target.checked ? item : "")
                }
                className="size-4 shrink-0 accent-[#5c53fe]"
              />
              {item}
              <span className="ml-auto text-xs text-[#6e6e78]">
                {jobs.filter((job) => job.category === item).length}
              </span>
            </Label>
          ))}
        </div>
      </fieldset>
    </aside>
  )
}
