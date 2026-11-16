import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"

export default function Page() {
  return (
    <div className="min-h-svh bg-[#010102] text-white">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}
