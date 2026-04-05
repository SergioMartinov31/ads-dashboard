import { useState } from "react"
import { generatePrice } from "../api/aiApi"

export const useAiPrice = () => {
  const [aiText, setAiText] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [wasUsed, setWasUsed] = useState(false)

  const generate = async (payload: {
    title: string
    params: unknown
  }) => {
    setLoading(true)
    setError(null)

    try {
      const data = await generatePrice(payload)
      setAiText(data.result)
      setWasUsed(true)
    } catch (e) {
      setError("Ошибка при генерации")
    } finally {
      setLoading(false)
    }
  }

  const close = () => {
    setAiText(null)
    setError(null)
  }

  return {
    aiText,
    loading,
    error,
    wasUsed,
    generate,
    close,
  }
}