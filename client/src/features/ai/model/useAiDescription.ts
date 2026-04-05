import { useState } from "react"
import { improveDescription } from "../api/aiApi"

export const useAiDescription = () => {
  const [aiText, setAiText] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [wasUsed, setWasUsed] = useState(false)

  const generate = async (payload: {
    title: string
    description: string
    params: unknown
  }) => {
    setLoading(true)
    setError(null)

    try {
      const data = await improveDescription(payload)
      setAiText(data.result)
      setWasUsed(true)
    } catch (e) {
      setError("Ошибка при генерации")
    } finally {
      setLoading(false)
    }
  }

  const apply = (setDescription: (v: string) => void) => {
    if (aiText) {
      setDescription(aiText)
      setAiText(null)
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
    apply,
    close,
  }
}