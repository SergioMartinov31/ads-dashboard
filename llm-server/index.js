import express from "express"
import cors from "cors"
import fetch from "node-fetch"
import "dotenv/config"

const app = express()

app.use(cors())
app.use(express.json())

app.post("/ai/description", async (req, res) => {
  const { title, description, params } = req.body

  const prompt = `
Ты — опытный автор объявлений для Авито.

Напиши улучшенное описание товара на основе данных.

Требования:
- Пиши естественно, как обычный человек
- Не забывай делать переносы строк для удобства чтения (\n)!!
- Без эмодзи
- Без излишне рекламных фраз ("идеальный выбор", "лучший на рынке" и т.п.)
- Используй факты из характеристик
- Не придумывай того, чего нет в данных
- Если есть противоречия — ориентируйся на название
- Текст должен быть 3–5 предложений
- Учитывай стиль площадки Авито (сдержанный, информативный)
- Без списков

ВАЖНО:
- Не повторяй "Название" и "Характеристики"
- Верни ТОЛЬКО текст описания

Данные:
Название: ${title}
Характеристики: ${JSON.stringify(params)}
Описание: ${description}
`

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    })

    const data = await response.json()

    res.json({
      result: data.choices?.[0]?.message?.content || "",
    })
  } catch (e) {
    res.status(500).json({ error: "AI error" })
  }
})

app.post("/ai/price", async (req, res) => {
  const { title, params } = req.body

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
Ты — эксперт по оценке объявлений Авито.

Дай оценку цены и краткую аналитику.

Формат ответа ОБЯЗАТЕЛЕН:

Средняя цена:
<название>

<диапазон> ₽ — отличное состояние.
<диапазон> ₽ — идеал.
<диапазон> ₽ — срочно / с дефектами.

Правила:
- каждый диапазон ОБЯЗАТЕЛЬНО заканчивается символом ₽
- диапазон имеет вид: 115 000 – 135 000 ₽
- символ ₽ используется ТОЛЬКО в строках с ценой
- не пиши ₽ нигде кроме цен
- 3 строки с ценами максимум
- без лишнего текста
`
        },
        {
          role: "user",
          content: `
Название: ${title}
Характеристики: ${JSON.stringify(params)}
          `,
        },
      ],
    }),
  })

  const data = await response.json()

  res.json({
    result: data.choices?.[0]?.message?.content || "",
  })
})


app.listen(3001, () => {
  console.log("LLM server running on 3001")
})