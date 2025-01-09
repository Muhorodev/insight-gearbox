import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface AnalysisResultsProps {
  data: any[] | null
}

export const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  if (!data) return null

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Analysis Results</h2>
      <div className="w-full aspect-[16/9]">
        <ChartContainer
          className="w-full h-full"
          config={{
            line1: {
              theme: {
                light: "#8DA290",
                dark: "#8DA290",
              },
            },
          }}
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={({ active, payload }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload}
                  nameKey="name"
                />
              )}
            />
            <Line
              type="monotone"
              dataKey="value"
              name="line1"
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  )
}