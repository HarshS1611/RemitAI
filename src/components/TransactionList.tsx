export default function TransactionList({

  data

}: any) {

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm">


      <h2 className="font-semibold text-slate-800 mb-4">

        Transactions

      </h2>


      {data.map((t: any) => (

        <div

          key={t.id}

          className="flex justify-between border-b py-2 text-sm"

        >

          <span className="text-slate-700">

            {t.amount} {t.currency}

          </span>


          <span className="text-slate-500">

            {t.status}

          </span>


        </div>

      ))}


    </div>
  )
}