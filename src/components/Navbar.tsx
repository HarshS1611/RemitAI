export default function Navbar({

    onLogin
  }: any) {
  
    return (
  
      <div className="flex justify-between items-center p-6 shadow">
  
        <h1 className="text-xl font-bold">
  
          RemitAI
        </h1>
  
        <button
  
          onClick={onLogin}
  
          className="bg-black text-white px-4 py-2 rounded-xl"
  
        >
  
          Login
        </button>
  
      </div>
    )
  }