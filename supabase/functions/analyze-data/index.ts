import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { data } = await req.json()

    // Basic statistical analysis
    const numericData = data.slice(1).map((row: any[]) => 
      row.filter((cell: any) => typeof cell === 'number')
    ).flat()

    const sum = numericData.reduce((a: number, b: number) => a + b, 0)
    const avg = sum / numericData.length
    const sorted = [...numericData].sort((a, b) => a - b)
    const median = sorted[Math.floor(sorted.length / 2)]

    // Generate monthly trend data (example)
    const analysisResults = [
      { name: 'Jan', value: Math.round(avg * 0.8) },
      { name: 'Feb', value: Math.round(avg * 0.9) },
      { name: 'Mar', value: Math.round(avg * 1.1) },
      { name: 'Apr', value: Math.round(avg * 1.2) },
      { name: 'May', value: Math.round(avg * 1.0) },
    ]

    return new Response(
      JSON.stringify(analysisResults),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})