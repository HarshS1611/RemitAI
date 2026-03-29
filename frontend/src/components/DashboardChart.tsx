import {

    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
  
  } from "recharts"
  
  
  export default function DashboardChart({
  
    data
  
  }: any) {
  
    const chartData = data.map(
  
      (t: any, i: number) => ({
  
        index: i + 1,
  
        amount: t.amount
  
      })
  
    )
  
  
    return (
  
      <div>
  
  
        <h2 className="font-medium text-foreground mb-4">
  
          Transaction Trend
  
        </h2>
  
  
        <div className="h-[260px]">
  
  
          <ResponsiveContainer width="100%" height="100%">
  
            <LineChart data={chartData}>
  
              <XAxis dataKey="index" />
  
              <YAxis />
  
              <Tooltip />
  
              <Line
  
                type="monotone"
  
                dataKey="amount"
  
                strokeWidth={2}
  
              />
  
            </LineChart>
  
          </ResponsiveContainer>
  
  
        </div>
  
  
      </div>
  
    )
  
  }