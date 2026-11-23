"use client"

import { useState } from "react"
import { BriefcaseBusiness, ChevronDown } from "lucide-react"
import type { Job } from "@/types"
import { JobCard } from "./job-card"
import { JobFilter } from "./job-filter"
import { JobSearch } from "./job-search"
import { useRouter } from "next/navigation"

type BrowseJobsContentProps = {
  jobs: Job[]
  filterJobs: Job[]
  initialKeyword: string
  initialCategory: string
  initialJobType: string
}

export function BrowseJobsContent({
  jobs,
  filterJobs,
  initialKeyword,
  initialCategory,
  initialJobType,
}: BrowseJobsContentProps) {
  const [keyword, setKeyword] = useState(initialKeyword)
  const [category, setCategory] = useState(initialCategory)
  const [jobType, setJobType] = useState(initialJobType)
  const router = useRouter()

  function updateResults(
    nextCategory: string,
    nextJobType: string,
    nextKeyword = keyword
  ) {
    const params = new URLSearchParams()
    if (nextKeyword.trim()) params.set("search", nextKeyword.trim())
    if (nextCategory) params.set("category", nextCategory)
    if (nextJobType) params.set("jobType", nextJobType)
    router.push(`/browse-jobs?${params.toString()}`, { scroll: false })
  }

  function handleSearchClick() {
    updateResults(category, jobType)
  }

  function handleKeywordChange(value: string) {
    setKeyword(value)
    if (!value.trim()) updateResults(category, jobType, "")
  }

  function handleCategoryChange(value: string) {
    setCategory(value)
    updateResults(value, jobType)
  }

  function handleJobTypeChange(value: string) {
    setJobType(value)
    updateResults(category, value)
  }

  return (
    <>
      <JobSearch
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
        onSearchClick={handleSearchClick}
      />
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[296px_minmax(0,1fr)] lg:gap-8">
        <JobFilter
          jobs={filterJobs}
          category={category}
          jobType={jobType}
          onCategoryChange={handleCategoryChange}
          onJobTypeChange={handleJobTypeChange}
        />
        <section aria-labelledby="browse-results-heading" className="min-w-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2
              id="browse-results-heading"
              className="text-lg leading-7 font-semibold sm:text-[22px]"
            >
              Found {jobs.length.toLocaleString("en-US")} Professional Jobs
            </h2>
            <div className="flex items-center gap-3 text-[13px]">
              <span className="text-[#6e6e78]">Sort by:</span>
              <span className="flex h-9 items-center gap-3 rounded-lg border border-white/10 bg-[#0c0c0f] px-3 text-[#ededf0]">
                Most Recent
                <ChevronDown
                  aria-hidden="true"
                  className="size-3.5 text-[#a0a0ab]"
                />
              </span>
            </div>
          </div>
          <div className="space-y-5">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
          {jobs.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-[#141418] px-6 py-16 text-center">
              <BriefcaseBusiness
                aria-hidden="true"
                className="mx-auto mb-4 size-10 text-[#6e6e78]"
              />
              <h3 className="text-lg font-semibold">No jobs available yet</h3>
              <p className="mt-2 text-sm text-[#a0a0ab]">
                New opportunities will appear here when jobs are posted.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
