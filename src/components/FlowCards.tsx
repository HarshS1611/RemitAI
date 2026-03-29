export default function FlowCards() {

    const steps = [
  
      {
  
        title: "Login",
  
        desc: "JWT auth generates secure user identity"
      },
  
      {
  
        title: "Create Transaction",
  
        desc: "User inputs recipient + amount"
      },
  
      {
  
        title: "AI Risk Check",
  
        desc: "Gemini evaluates transaction risk"
      },
  
      {
  
        title: "Stored in PostgreSQL",
  
        desc: "Async SQLAlchemy persists data"
      }
    ]
  
  
    return (
  
      <div className="grid grid-cols-4 gap-4 my-10">
  
  
        {steps.map(step => (
  
          <div
  
            key={step.title}
  
            className="p-4 border rounded-xl"
  
          >
  
            <h3 className="font-semibold">
  
              {step.title}
  
            </h3>
  
            <p className="text-sm text-gray-500">
  
              {step.desc}
  
            </p>
  
          </div>
  
        ))}
  
  
      </div>
    )
  }