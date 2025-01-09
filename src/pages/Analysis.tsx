import { LineChart } from "lucide-react"

const Analysis = () => {
  return (
    <div className="flex-1 flex flex-col">
      <header className="h-14 border-b flex items-center px-6">
        <h1 className="text-xl font-semibold">Analysis Dashboard</h1>
      </header>
      <div className="flex-1 p-6">
        <div className="rounded-xl border-2 border-dashed border-gray-200 h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
          <LineChart className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            No Analysis Data Available
          </h3>
          <p className="text-sm text-gray-500">
            Upload and analyze data from the Spreadsheets section
          </p>
        </div>
      </div>
    </div>
  )
}

export default Analysis