import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useState } from "react"


export default function TransactionForm({

  onSubmit

}: any) {

  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")


  return (

    <Card>

      <CardContent className="p-6 space-y-4">


        <h2 className="font-medium">

          Send transfer

        </h2>


        <Input

          placeholder="Recipient ID"

          value={recipient}

          onChange={e => setRecipient(e.target.value)}

        />


        <Input

          placeholder="Amount"

          value={amount}

          onChange={e => setAmount(e.target.value)}

        />


        <Button

          className="w-full"

          onClick={() =>

            onSubmit({

              recipient_id: recipient,

              amount: Number(amount),

              currency: "USD"

            })

          }

        >

          Send payment

        </Button>


      </CardContent>

    </Card>

  )

}