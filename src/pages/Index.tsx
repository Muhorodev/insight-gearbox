import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Workspace } from "@/components/Workspace"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b flex items-center px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold ml-4">
              Decision Support System
            </h1>
          </header>
          <Workspace />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Index