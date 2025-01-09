import { Save, Edit, X, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionButtonsProps {
  onSave: () => void
  onEdit: () => void
  onClose: () => void
  onAnalyze: () => void
  disabled?: boolean
}

export const ActionButtons = ({
  onSave,
  onEdit,
  onClose,
  onAnalyze,
  disabled = false,
}: ActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onSave}
        disabled={disabled}
        className="bg-green-600 hover:bg-green-700"
      >
        <Save className="mr-2 h-4 w-4" />
        Save
      </Button>
      <Button onClick={onEdit} disabled={disabled} variant="outline">
        <Edit className="mr-2 h-4 w-4" />
        Edit
      </Button>
      <Button onClick={onAnalyze} disabled={disabled} variant="secondary">
        <LineChart className="mr-2 h-4 w-4" />
        Analyze
      </Button>
      <Button onClick={onClose} disabled={disabled} variant="ghost">
        <X className="mr-2 h-4 w-4" />
        Close
      </Button>
    </div>
  )
}