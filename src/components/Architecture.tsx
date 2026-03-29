export default function Architecture() {

    const stack = [
  
      "FastAPI backend",
  
      "Neon PostgreSQL",
  
      "JWT auth",
  
      "Gemini AI fraud detection",
  
      "Async SQLAlchemy",
  
      "React dashboard",
  
      "Docker ready"
    ]
  
  
    return (
  
      <div className="py-20">
  
  
        <h2 className="text-3xl font-semibold text-center mb-10">
  
          Project Architecture
  
        </h2>
  
  
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
  
  
          {stack.map(s => (
  
            <div
  
              key={s}
  
              className="p-4 border rounded-xl text-center"
  
            >
  
              {s}
  
            </div>
  
          ))}
  
  
        </div>
  
      </div>
    )
  }