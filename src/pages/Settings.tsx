import { Settings as SettingsIcon } from "lucide-react"

const Settings = () => {
  return (
    <div className="flex-1 flex flex-col">
      <header className="h-14 border-b flex items-center px-6">
        <h1 className="text-xl font-semibold">Settings</h1>
      </header>
      <div className="flex-1 p-6">
        <div className="rounded-xl border-2 border-dashed border-gray-200 h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
          <SettingsIcon className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Settings Coming Soon
          </h3>
          <p className="text-sm text-gray-500">
            Configure your analysis preferences
          </p>
        </div>
      </div>
    </div>
  )
}

export default Settings