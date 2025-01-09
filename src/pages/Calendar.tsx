import { Calendar as CalendarIcon } from "lucide-react"

const Calendar = () => {
  return (
    <div className="flex-1 flex flex-col">
      <header className="h-14 border-b flex items-center px-6">
        <h1 className="text-xl font-semibold">Calendar</h1>
      </header>
      <div className="flex-1 p-6">
        <div className="rounded-xl border-2 border-dashed border-gray-200 h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
          <CalendarIcon className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Calendar Coming Soon
          </h3>
          <p className="text-sm text-gray-500">
            Schedule and track your analysis tasks
          </p>
        </div>
      </div>
    </div>
  )
}

export default Calendar