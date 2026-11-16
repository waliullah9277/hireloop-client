import Image from "next/image"
import Link from "next/link"
import { Manrope } from "next/font/google"
import { BriefcaseBusiness, MapPin, Search } from "lucide-react"

import globe from "@/app/images/globe.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const manrope = Manrope({ subsets: ["latin"] })
const trendingRoles = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className={`${manrope.className} relative isolate min-h-svh w-full overflow-hidden bg-[#010102] px-4 pt-16 pb-48 text-white sm:px-6 sm:pt-24 sm:pb-64 lg:pt-32`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <Image
          src={globe}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#010102] via-[#010102]/40 to-[#010102]" />
      </div>

      <div className="mx-auto max-w-[784px] text-center">
        <div className="mx-auto flex max-w-[549px] items-center justify-center">
          <span
            aria-hidden="true"
            className="hidden h-px flex-1 bg-linear-to-r from-transparent to-[#8c80ff] sm:block"
          />
          <p className="flex items-center justify-center gap-3 rounded-full border border-[#8b80ff]/40 bg-linear-to-r from-[#292044]/80 to-[#15131e]/90 px-4 py-3 font-mono text-xs sm:gap-4 sm:px-6 sm:text-lg">
            <BriefcaseBusiness
              aria-hidden="true"
              className="size-5 shrink-0 text-[#b6aaff] sm:size-6"
            />
            50,000+ new jobs this month
          </p>
          <span
            aria-hidden="true"
            className="hidden h-px flex-1 bg-linear-to-l from-transparent to-[#8c80ff] sm:block"
          />
        </div>

        <h1
          id="hero-heading"
          className="mt-8 text-4xl leading-[1.15] font-bold tracking-tight text-balance sm:text-5xl lg:text-[56px]"
        >
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 text-base leading-7 text-white/85 sm:text-xl sm:leading-8">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <form
          action="/jobs"
          method="get"
          role="search"
          aria-label="Search jobs"
          className="mt-8 flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#101010] p-2 text-left shadow-xl shadow-black/20 sm:mt-12 sm:flex-row sm:items-center sm:gap-4 sm:pl-6"
        >
          <div className="flex min-w-0 flex-1 items-center gap-2 px-2 sm:px-0">
            <Search
              aria-hidden="true"
              className="size-6 shrink-0 text-white/70"
            />
            <label htmlFor="job-query" className="sr-only">
              Job title, skill or company
            </label>
            <Input
              id="job-query"
              name="q"
              type="search"
              placeholder="Job title, skill or company"
              className="h-12 border-transparent bg-transparent px-1 text-white placeholder:text-white/65 focus-visible:ring-[#a6a0ff] md:text-base dark:bg-transparent"
            />
          </div>
          <Separator
            orientation="vertical"
            aria-hidden="true"
            className="hidden h-6 bg-white/20 sm:block data-vertical:self-center"
          />
          <div className="flex min-w-0 flex-1 items-center gap-2 border-t border-white/10 px-2 pt-2 sm:border-0 sm:px-0 sm:pt-0">
            <MapPin
              aria-hidden="true"
              className="size-6 shrink-0 text-white/70"
            />
            <label htmlFor="job-location" className="sr-only">
              Location or remote
            </label>
            <Input
              id="job-location"
              name="location"
              placeholder="Location or Remote"
              className="h-12 border-transparent bg-transparent px-1 text-white placeholder:text-white/65 focus-visible:ring-[#a6a0ff] md:text-base dark:bg-transparent"
            />
          </div>
          <Button
            type="submit"
            aria-label="Search jobs"
            className="h-12 gap-2 rounded-xl bg-[#5c53fe] px-4 text-base text-white hover:bg-[#7068ff] focus-visible:ring-[#a6a0ff] sm:size-12 sm:px-0"
          >
            <Search aria-hidden="true" className="size-6" />
            <span className="sm:hidden">Search Jobs</span>
          </Button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          <p className="text-sm text-white/80 sm:text-base">
            Trending Position
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {trendingRoles.map((role) => (
              <li key={role}>
                <Button
                  nativeButton={false}
                  render={
                    <Link href={{ pathname: "/jobs", query: { q: role } }} />
                  }
                  variant="secondary"
                  className="h-auto min-h-9 rounded-full bg-[#1a1a1b] px-3 py-1.5 text-sm font-normal text-white hover:bg-[#302b49] focus-visible:ring-[#a6a0ff]"
                >
                  {role}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
