import { useNavigate } from "react-router-dom"


export default function Landing() {

  const navigate = useNavigate()


  return (

    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6">


      <h1 className="text-5xl font-bold text-slate-900 mb-4">

        RemitAI

      </h1>


      <p className="text-slate-600 mb-10 text-lg text-center max-w-xl">

        AI powered cross-border payments dashboard with fraud detection

      </p>


      <button

        onClick={() => navigate("/dashboard")}

        className="bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-xl shadow"

      >

        Show Demo

      </button>


      <div className="grid grid-cols-3 gap-6 mt-20 max-w-5xl">


        <Card

          title="FastAPI Backend"

          desc="Async architecture with PostgreSQL"

        />


        <Card

          title="AI Fraud Detection"

          desc="Gemini powered anomaly detection"

        />


        <Card

          title="JWT Auth"

          desc="Secure role based authentication"

        />


      </div>

    </div>
  )
}


function Card({ title, desc }: any) {

  return (

    <div className="bg-white p-6 rounded-xl shadow-sm border">


      <h3 className="font-semibold text-slate-800 mb-1">

        {title}

      </h3>


      <p className="text-sm text-slate-500">

        {desc}

      </p>


    </div>
  )
}