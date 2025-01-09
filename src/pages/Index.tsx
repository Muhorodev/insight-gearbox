import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Home } from "lucide-react"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b flex items-center px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold ml-4">Dashboard</h1>
          </header>
          <div className="flex-1 p-6">
            <div className="rounded-xl border-2 border-dashed border-gray-200 h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
              <Home className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Welcome to DSS</h3>
              <p className="text-sm text-gray-500">
                Start by uploading spreadsheets for analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Index