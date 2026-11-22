"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"

type Role = "seeker" | "recruiter" | "admin"

type SidebarItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

const itemsOnTheRole: Record<Role, SidebarItem[]> = {
  seeker: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      id: "jobs",
      name: "Jobs",
      url: "/dashboard/seeker/jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "saved-jobs",
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: Bookmark,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      id: "billing",
      name: "Billing",
      url: "/dashboard/seeker/billing",
      icon: CreditCard,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],
  recruiter: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      id: "jobs",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/recruiter/applicants",
      icon: FileText,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "users",
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "companies",
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      id: "jobs",
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "payments",
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: CreditCard,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session, isPending } = useSession()
  const role = session?.user?.role
  const items =
    !isPending &&
    (role === "seeker" || role === "recruiter" || role === "admin")
      ? itemsOnTheRole[role]
      : []

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu
            aria-label="Dashboard navigation"
            aria-busy={isPending}
          >
            {items.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={
                    pathname === item.url ||
                    (item.id !== "dashboard" &&
                      pathname.startsWith(`${item.url}/`))
                  }
                  render={
                    <Link
                      href={item.url}
                      aria-current={
                        pathname === item.url ||
                        (item.id !== "dashboard" &&
                          pathname.startsWith(`${item.url}/`))
                          ? "page"
                          : undefined
                      }
                    />
                  }
                >
                  <item.icon aria-hidden="true" />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
