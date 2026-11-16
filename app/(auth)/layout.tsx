import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import logo from "@/app/images/logo.png"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative isolate min-h-svh bg-[#010102] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(92,83,254,0.18),transparent_60%)]"
      />
      <header className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-6 sm:px-6">
        <Link
          href="/"
          aria-label="HireLoop home"
          className="rounded focus-visible:outline-2 focus-visible:outline-[#a6a0ff]"
        >
          <Image
            src={logo}
            alt="HireLoop"
            width={154}
            height={44}
            className="h-auto w-32 sm:w-[154px]"
          />
        </Link>
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#a6a0ff]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </Link>
      </header>
      <main className="mx-auto flex max-w-lg flex-col px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
        {children}
      </main>
    </div>
  )
}
