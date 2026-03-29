export default function Architecture() {

    const stack = [
  
      "React + Vite",
  
      "FastAPI",
  
      "JWT Auth",
  
      "Gemini AI",
  
      "Async SQLAlchemy",
  
      "Neon PostgreSQL"
  
    ]
  
  
    return (
  
      <div className="bg-white py-20">
  
  
        <h2 className="text-3xl text-center font-semibold mb-10 text-slate-900">
  
          Architecture
  
        </h2>
  
  
        <div className="flex flex-wrap justify-center gap-4">
  
  
          {stack.map(s => (
  
            <div
  
              key={s}
  
              className="border px-4 py-2 rounded-lg text-slate-700"
  
            >
  
              {s}
  
            </div>
  
          ))}
  
  
        </div>
  
  
      </div>
  
    )
  }