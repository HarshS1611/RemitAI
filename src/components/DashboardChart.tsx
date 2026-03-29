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

  const chartData = data.map((t: any, i: number) => ({

    name: i + 1,

    amount: t.amount

  }))


  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm">


      <h2 className="font-semibold text-slate-800 mb-4">

        Transaction Volume

      </h2>


      <ResponsiveContainer width="100%" height={250}>


        <LineChart data={chartData}>


          <XAxis dataKey="name" />


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
  )
}