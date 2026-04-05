const AI_BASE_URL = import.meta.env.VITE_AI_URL ?? "http://localhost:3001"

export const improveDescription = async (payload: {
  title: string
  description: string
  params: unknown
}) => {
  const res = await fetch(`${AI_BASE_URL}/ai/description`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error("AI request failed")

  return res.json()
}

export const generatePrice = async (payload: {
  title: string
  params: unknown
}) => {
  const res = await fetch(`${AI_BASE_URL}/ai/price`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error("AI request failed")

  return res.json()
}