import { Workspace } from "@/components/Workspace"

const Spreadsheets = () => {
  return (
    <div className="flex-1 flex flex-col">
      <header className="h-14 border-b flex items-center px-6">
        <h1 className="text-xl font-semibold">Spreadsheets</h1>
      </header>
      <Workspace />
    </div>
  )
}

export default Spreadsheets