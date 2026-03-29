import { useEffect, useState } from "react"

import TransactionForm from "../components/TransactionForm"
import TransactionList from "../components/TransactionList"
import DashboardChart from "../components/DashboardChart"

import {

  login,
  createTransaction,
  getTransactions

} from "../api/client"


export default function Dashboard() {

  const [token, setToken] = useState("")

  const [transactions, setTransactions] = useState([])


  useEffect(() => {

    init()

  }, [])


  async function init() {

    const res = await login()

    setToken(res.access_token)

    loadData(res.access_token)
  }


  async function loadData(t: string) {

    const data = await getTransactions(t)

    setTransactions(data)
  }


  async function handleSend(data: any) {

    await createTransaction(token, data)

    loadData(token)
  }


  return (

    <div className="min-h-screen bg-slate-50 p-10">


      <h1 className="text-3xl font-bold text-slate-900 mb-6">

        Dashboard

      </h1>


      <DashboardChart data={transactions} />


      <div className="grid grid-cols-2 gap-6 mt-6">


        <TransactionForm onSubmit={handleSend} />


        <TransactionList data={transactions} />


      </div>


    </div>
  )
}