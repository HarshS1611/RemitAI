import { useNavigate } from "react-router-dom"

export default function Navbar() {

  const navigate = useNavigate()

  return (

    <div className="flex justify-between items-center px-10 py-6">

      <h1 className="text-xl font-semibold text-slate-900">

        RemitAI
      </h1>

      <button

        onClick={() => navigate("/dashboard")}

        className="bg-slate-900 text-white px-4 py-2 rounded-lg"

      >

        Show Demo

      </button>

    </div>

  )
}