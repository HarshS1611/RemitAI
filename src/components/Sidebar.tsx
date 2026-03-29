import { Home, Send } from "lucide-react"

export default function Sidebar() {

  return (

    <div className="w-64 h-screen bg-black text-white p-6">

      <h1 className="text-2xl font-bold mb-10">

        RemitAI
      </h1>

      <nav className="space-y-4">

        <div className="flex items-center gap-2">

          <Home size={18} />

          Dashboard

        </div>

        <div className="flex items-center gap-2">

          <Send size={18} />

          Transfers

        </div>

      </nav>

    </div>
  )
}