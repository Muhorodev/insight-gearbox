import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export const Workspace = () => {
  const [isDragging, setIsDragging] = useState(false)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    const excelFiles = files.filter(file => 
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel"
    )

    if (excelFiles.length > 0) {
      toast({
        title: "Files received",
        description: `Uploaded ${excelFiles.length} Excel ${excelFiles.length === 1 ? 'file' : 'files'}`,
      })
    } else {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload Excel files only (.xlsx or .xls)",
      })
    }
  }

  return (
    <div className="flex-1 p-6">
      <div
        className={`
          h-[calc(100vh-6rem)] rounded-xl border-2 border-dashed
          transition-colors duration-200 ease-in-out
          flex flex-col items-center justify-center
          ${isDragging 
            ? "border-primary bg-primary/5" 
            : "border-gray-200 hover:border-primary/50"}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          Drag and drop your Excel files here
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          or click to select files
        </p>
        <Button>
          Select Files
        </Button>
      </div>
    </div>
  )
}