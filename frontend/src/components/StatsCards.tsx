import { Card, CardContent } from "@/components/ui/card"


export default function StatsCards({ data }: any) {

  const total = data.reduce(
    (sum: number, t: any) => sum + t.amount,
    0
  )

  const avg = total / (data.length || 1)


  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


      <StatCard
        label="Total Volume"
        value={`$${total}`}
      />


      <StatCard
        label="Transactions"
        value={data.length}
      />


      <StatCard
        label="Average"
        value={`$${Math.round(avg)}`}
      />


    </div>

  )

}


function StatCard({ label, value }: any) {

  return (

    <Card>

      <CardContent className="p-5">


        <p className="text-sm text-muted-foreground">

          {label}

        </p>


        <p className="text-xl font-semibold text-foreground mt-1">

          {value}

        </p>


      </CardContent>

    </Card>

  )

}