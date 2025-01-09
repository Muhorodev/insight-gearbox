import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { DataTable } from "@/components/DataTable"
import { ActionButtons } from "@/components/ActionButtons"
import { AnalysisResults } from "@/components/AnalysisResults"

export const Workspace = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [excelData, setExcelData] = useState<any[][] | null>(null)
  const [analysisData, setAnalysisData] = useState<any[] | null>(null)
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
      // Mock data for demonstration
      setExcelData([
        ["Name", "Age", "City"],
        ["John Doe", 30, "New York"],
        ["Jane Smith", 25, "Los Angeles"],
        ["Bob Johnson", 35, "Chicago"],
      ])
      
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

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully",
    })
  }

  const handleEdit = () => {
    toast({
      title: "Edit mode",
      description: "You can now edit the data",
    })
  }

  const handleClose = () => {
    setExcelData(null)
    setAnalysisData(null)
    toast({
      title: "Workspace cleared",
      description: "All data has been cleared",
    })
  }

  const handleAnalyze = () => {
    // Mock analysis data for demonstration
    setAnalysisData([
      { name: "Jan", value: 400 },
      { name: "Feb", value: 300 },
      { name: "Mar", value: 600 },
      { name: "Apr", value: 800 },
      { name: "May", value: 500 },
    ])
    
    toast({
      title: "Analysis complete",
      description: "Data analysis has been completed",
    })
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      {!excelData ? (
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
      ) : (
        <div className="space-y-6">
          <ActionButtons
            onSave={handleSave}
            onEdit={handleEdit}
            onClose={handleClose}
            onAnalyze={handleAnalyze}
          />
          <DataTable data={excelData} />
          {analysisData && <AnalysisResults data={analysisData} />}
        </div>
      )}
    </div>
  )
}