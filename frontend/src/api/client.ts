const API_URL = import.meta.env.VITE_API_URL


export async function login() {

  const res = await fetch(`${API_URL}/login`, {

    method: "POST"

  })

  return res.json()

}


export async function createTransaction(

  token: string,
  data: {

    amount: number
    currency: string
    recipient_id: string

  }

) {

  const res = await fetch(`${API_URL}/transactions`, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,

      "idempotency-key": crypto.randomUUID()

    },

    body: JSON.stringify(data)

  })

  return res.json()

}


export async function getTransactions(token: string) {

  const res = await fetch(`${API_URL}/transactions`, {

    headers: {

      Authorization: `Bearer ${token}`

    }

  })

  return res.json()

}