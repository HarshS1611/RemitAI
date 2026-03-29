import { useState } from "react"


export default function TransactionForm({

  onSubmit

}: any) {

  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")


  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm">


      <h2 className="font-semibold text-slate-800 mb-4">

        Send Transfer

      </h2>


      <input

        placeholder="Recipient ID"

        value={recipient}

        onChange={e => setRecipient(e.target.value)}

        className="border rounded p-2 w-full mb-3 text-slate-800"

      />


      <input

        placeholder="Amount"

        value={amount}

        onChange={e => setAmount(e.target.value)}

        className="border rounded p-2 w-full mb-4 text-slate-800"

      />


      <button

        onClick={() =>

          onSubmit({

            recipient_id: recipient,

            amount: Number(amount),

            currency: "USD"
          })

        }

        className="bg-slate-900 hover:bg-black text-white w-full py-2 rounded"

      >

        Send Money

      </button>


    </div>
  )
}