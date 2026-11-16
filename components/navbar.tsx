"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import logo from "@/app/images/logo.png"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const links = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
]

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a6a0ff]"

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)")
    function closeOnDesktop() {
      if (desktop.matches) setOpen(false)
    }
    desktop.addEventListener("change", closeOnDesktop)
    return () => desktop.removeEventListener("change", closeOnDesktop)
  }, [])

  return (
    <header className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-10 xl:px-[60px]">
      <Collapsible
        render={<nav />}
        open={open}
        onOpenChange={setOpen}
        aria-label="Main navigation"
        className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between rounded-2xl bg-[#222222] p-3 text-white sm:pl-6 lg:min-h-[74px] lg:py-2 lg:pr-2"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false)
            toggleRef.current?.focus()
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
        }}
      >
        <Link
          href="/"
          aria-label="HireLoop home"
          className={cn("shrink-0 rounded-sm", focusStyle)}
          onClick={() => setOpen(false)}
        >
          <Image
            src={logo}
            alt="HireLoop"
            width={154}
            height={44}
            className="h-auto w-[132px] sm:w-[154px]"
          />
        </Link>

        <CollapsibleTrigger
          render={<Button variant="ghost" size="icon" />}
          ref={toggleRef}
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className={cn(
            "size-11 rounded-xl text-white hover:bg-white/10 hover:text-white aria-expanded:bg-white/10 aria-expanded:text-white lg:hidden",
            focusStyle
          )}
        >
          {open ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <Menu className="size-6" aria-hidden="true" />
          )}
        </CollapsibleTrigger>

        <div className="hidden items-center gap-6 lg:flex">
          <NavbarLinks pathname={pathname} onNavigate={() => setOpen(false)} />
        </div>
        <CollapsibleContent className="w-full lg:hidden">
          <div className="mt-3 flex flex-col gap-3 border-t border-white/10 pt-3">
            <NavbarLinks
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </header>
  )
}

function NavbarLinks({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate: () => void
}) {
  return (
    <>
      <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-10">
        {links.map(({ label, href }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
                className={cn(
                  "flex min-h-11 items-center rounded-lg px-3 text-base transition-colors hover:bg-white/5 hover:text-[#b9b4ff] lg:px-0 lg:hover:bg-transparent",
                  active && "text-[#b9b4ff]",
                  focusStyle
                )}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>

      <Separator
        orientation="vertical"
        aria-hidden="true"
        className="hidden h-6 bg-white/20 lg:block data-vertical:self-center"
      />

      <div className="grid grid-cols-2 items-center gap-4 border-t border-white/10 pt-3 lg:flex lg:border-0 lg:pt-0">
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href="/login" />}
          onClick={onNavigate}
          className={cn(
            "min-h-[52px] rounded-xl px-6 text-lg font-semibold text-white hover:bg-white/10 hover:text-white lg:min-h-[58px]",
            focusStyle
          )}
        >
          Sign In
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/register" />}
          onClick={onNavigate}
          className={cn(
            "min-h-[52px] rounded-xl bg-[#5c53fe] px-4 text-base font-medium text-white hover:bg-[#7068ff] sm:px-6 sm:text-lg lg:min-w-[143px]",
            focusStyle
          )}
        >
          Get Started
        </Button>
      </div>
    </>
  )
}
