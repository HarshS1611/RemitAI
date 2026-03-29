import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import TransactionForm from "../components/TransactionForm"
import TransactionList from "../components/TransactionList"
import DashboardChart from "../components/DashboardChart"
import StatsCards from "../components/StatsCards"

import {
  login,
  createTransaction,
  getTransactions
} from "../api/client"


export default function Dashboard() {

  const [token, setToken] = useState("")
  const [transactions, setTransactions] = useState([])


  useEffect(() => {

    const savedToken = localStorage.getItem("token")

    if (savedToken) {

      setToken(savedToken)

      loadTransactions(savedToken)

    } else {

      init()

    }

  }, [])


  async function init() {

    const res = await login()

    localStorage.setItem("token", res.access_token)

    setToken(res.access_token)

    loadTransactions(res.access_token)

  }


  async function loadTransactions(t: string) {

    const data = await getTransactions(t)

    setTransactions(data)

  }


  async function handleSend(data: any) {

    await createTransaction(token, data)

    loadTransactions(token)

  }


  return (

    <div className="min-h-screen bg-background">


      <div className="max-w-6xl mx-auto p-8 space-y-6">


        {/* header */}

        <div className="flex justify-between items-center">


          <h1 className="text-2xl font-semibold text-foreground">

            Dashboard

          </h1>


          <Button
            variant="outline"
            onClick={() => {

              localStorage.removeItem("token")

              window.location.reload()

            }}
          >

            Reset Session

          </Button>


        </div>


        {/* stats */}

        <StatsCards data={transactions} />


        {/* chart */}

        <Card>

          <CardContent className="p-6">

            <DashboardChart data={transactions} />

          </CardContent>

        </Card>


        {/* main grid */}

        <div className="grid md:grid-cols-2 gap-6">


          <TransactionForm onSubmit={handleSend} />


          <TransactionList data={transactions} />


        </div>


      </div>


    </div>

  )

}