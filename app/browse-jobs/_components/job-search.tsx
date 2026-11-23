"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type JobSearchProps = {
  keyword: string
  onKeywordChange: (value: string) => void
  onSearchClick: () => void
}

export function JobSearch({
  keyword,
  onKeywordChange,
  onSearchClick,
}: JobSearchProps) {
  return (
    <section
      aria-label="Search jobs"
      className="rounded-xl border border-white/10 bg-[#141418] p-4 sm:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <div className="relative min-w-0 flex-1">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#6e6e78]"
          />
          <label htmlFor="browse-keyword" className="sr-only">
            Job title, keywords or company
          </label>
          <Input
            id="browse-keyword"
            name="q"
            type="search"
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") onSearchClick()
            }}
            placeholder="Search by job title, keywords..."
            className="h-14 rounded-lg border-white/10 bg-[#0c0c0f] pl-12 text-[#ededf0] placeholder:text-[#a0a0ab] focus-visible:ring-[#5c53fe]/40 md:text-sm dark:bg-[#0c0c0f]"
          />
        </div>
        <Button
          type="button"
          onClick={onSearchClick}
          className="h-14 rounded-lg bg-white px-7 text-base font-semibold text-[#2f3131] hover:bg-white/90 focus-visible:ring-[#a6a0ff]"
        >
          Search Jobs
        </Button>
      </div>
    </section>
  )
}
