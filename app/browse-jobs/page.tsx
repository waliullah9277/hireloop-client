import { getJobs } from "@/lib/api/jobs"
import type { Job } from "@/types"
import React from "react"
import { Navbar } from "@/components/navbar"
import { BrowseJobsContent } from "./_components/browse-jobs-content"

const BrowseJobPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams(search as Record<string, string>)
  const query = urlSearch.toString()

  console.log(query)

  const jobs: Job[] = await getJobs(query)
  const filterJobs: Job[] = query ? await getJobs() : jobs

  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? (value[0] ?? "") : (value ?? "")

  return (
    <div className="min-h-svh bg-[#08080a] text-[#ededf0]">
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-4 pt-6 pb-16 sm:px-6 lg:px-10 xl:px-20">
        <h1 className="sr-only">Browse Jobs</h1>
        <BrowseJobsContent
          key={query}
          jobs={jobs}
          filterJobs={filterJobs}
          initialKeyword={first(search.search)}
          initialCategory={first(search.category)}
          initialJobType={first(search.jobType)}
        />
      </main>
    </div>
  )
}

export default BrowseJobPage
