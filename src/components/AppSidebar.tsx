import {
  Calendar,
  FileSpreadsheet,
  Home,
  LineChart,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
  },
  {
    title: "Spreadsheets",
    icon: FileSpreadsheet,
    url: "/spreadsheets",
  },
  {
    title: "Analysis",
    icon: LineChart,
    url: "/analysis",
  },
  {
    title: "Calendar",
    icon: Calendar,
    url: "/calendar",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={item.url === window.location.pathname}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}