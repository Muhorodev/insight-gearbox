import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import * as XLSX from 'xlsx'
import { supabase } from "@/lib/supabase"

interface FileUploaderProps {
  onDataLoaded: (data: any[][]) => void
}

interface UploadedFile {
  id: string
  filename: string
  storage_path: string
  file_size: number
}

export const FileUploader = ({ onDataLoaded }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const processExcelFile = async (file: File) => {
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('excel-files')
          .upload(`${Date.now()}-${file.name}`, file)

        if (uploadError) throw uploadError

        const { data: fileData, error: fileError } = await supabase
          .from('uploaded_files')
          .insert([
            {
              filename: file.name,
              storage_path: uploadData.path,
              file_size: file.size,
            }
          ])
          .select()
          .single()

        if (fileError) throw fileError

        const { error: rawDataError } = await supabase
          .from('raw_data')
          .insert(
            (jsonData as any[]).slice(1).map((row) => ({
              file_id: (fileData as UploadedFile).id,
              data: row,
            }))
          )

        if (rawDataError) throw rawDataError

        onDataLoaded(jsonData as any[][])
        toast({
          title: "File uploaded successfully",
          description: "Your Excel file has been processed and stored",
        })
      } catch (error: any) {
        console.error('Error processing file:', error)
        toast({
          variant: "destructive",
          title: "Error processing file",
          description: error.message,
        })
      }
    }

    reader.readAsBinaryString(file)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    const excelFiles = files.filter(file => 
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel"
    )

    if (excelFiles.length > 0) {
      setIsLoading(true)
      await processExcelFile(excelFiles[0])
      setIsLoading(false)
    } else {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload Excel files only (.xlsx or .xls)",
      })
    }
  }

  return (
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
      <Button disabled={isLoading}>
        {isLoading ? "Processing..." : "Select Files"}
      </Button>
    </div>
  )
}