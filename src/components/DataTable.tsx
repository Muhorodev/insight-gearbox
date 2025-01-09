import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"

interface DataTableProps {
  data: any[][] | null
}

export const DataTable = ({ data }: DataTableProps) => {
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<any[][]>([])

  useEffect(() => {
    if (data && data.length > 0) {
      // Assume first row contains headers
      setHeaders(data[0])
      // Rest of the rows are data
      setRows(data.slice(1))
    }
  }, [data])

  if (!data) return null

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
