import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { DataTable } from "@/components/DataTable"
import { ActionButtons } from "@/components/ActionButtons"
import { AnalysisResults } from "@/components/AnalysisResults"
import { FileUploader } from "@/components/FileUploader"
import { supabase } from "@/lib/supabase"

export const Workspace = () => {
  const [excelData, setExcelData] = useState<any[][] | null>(null)
  const [analysisData, setAnalysisData] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    try {
      if (!excelData || !excelData[0]) {
        throw new Error("No data to save")
      }

      const { error } = await supabase
        .from('analysis_results')
        .insert([
          {
            file_id: (excelData[0] as any).id,
            results: analysisData,
          }
        ])

      if (error) throw error

      toast({
        title: "Changes saved",
        description: "Your changes have been saved successfully",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error saving changes",
        description: error.message,
      })
    }
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

  const handleAnalyze = async () => {
    try {
      setIsLoading(true)
      
      const { data, error } = await supabase.functions.invoke('analyze-data', {
        body: { data: excelData }
      })

      if (error) throw error

      setAnalysisData(data)
      toast({
        title: "Analysis complete",
        description: "Data analysis has been completed",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Analysis error",
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      {!excelData ? (
        <FileUploader onDataLoaded={setExcelData} />
      ) : (
        <div className="space-y-6">
          <ActionButtons
            onSave={handleSave}
            onEdit={handleEdit}
            onClose={handleClose}
            onAnalyze={handleAnalyze}
            disabled={isLoading}
          />
          <DataTable data={excelData} />
          {analysisData && <AnalysisResults data={analysisData} />}
        </div>
      )}
    </div>
  )
}