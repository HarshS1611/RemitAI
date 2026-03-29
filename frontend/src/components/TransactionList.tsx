import { Card, CardContent } from "@/components/ui/card"


export default function TransactionList({

  data

}: any) {

  return (

    <Card>

      <CardContent className="p-6">


        <h2 className="font-medium text-foreground mb-4">

          Transactions

        </h2>


        <div className="space-y-2">


          {data.map((t: any) => (

            <div

              key={t.id}

              className="flex justify-between items-center border-b border-border pb-2 text-sm"

            >

              <span className="text-foreground">

                ${t.amount} {t.currency}

              </span>


              <span className="text-muted-foreground">

                {t.status}

              </span>


            </div>

          ))}


          {data.length === 0 && (

            <p className="text-sm text-muted-foreground">

              No transactions yet

            </p>

          )}


        </div>


      </CardContent>

    </Card>

  )

}