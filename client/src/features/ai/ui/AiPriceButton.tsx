import { Button, Popover, Text, Group, Loader } from "@mantine/core"
import { useAiPrice } from "../model/useAiPrice"

type Props = {
  title: string
  params: unknown
  onApply: (price: number) => void
}

export const AiPriceButton = ({ title, params, onApply }: Props) => {
  const { aiText, loading, error, wasUsed, generate, close } = useAiPrice()

  const getText = () => {
    if (loading) return "Выполняется запрос"
    if (wasUsed) return "Повторить запрос"
    return "Узнать рыночную цену"
  }

  const parsePrice = (text: string): number | null => {
    const match = text.match(/(\d[\d\s]{3,})\s*₽/)

    if (!match) return null

    return Number(match[1].replace(/\s/g, ""))
  }

  return (
    <Popover opened={!!aiText || !!error} withArrow offset={7} position="right">
      <Popover.Target>
        <Button
          variant="light"
          color="#FFA940"
          bg="#F9F1E6"
          disabled={loading}
          style={{ width: "fit-content" , alignSelf: 'end'}}
          onClick={() => generate({ title, params })}
        >
          {loading ? (
            <>
              <Loader size="xs" mr={6} color="#FFA940" />
              <span style={{ color: "#FFA940" }}>Выполняется запрос</span>
            </>
          ) : (
            <span style={{ color: "#FFA940" }}>💡 {getText()}</span>
          )}
        </Button>
      </Popover.Target>

      <Popover.Dropdown bg={error ? "#FEE9E7" : "#FFFFFF"}>
        {error ? (
           <>
            <Text c="red" fw={500}>
              Произошла ошибка при запросе к AI
            </Text>

            <Text size="sm" mt="xs">
              Попробуйте повторить запрос или закройте уведомление
            </Text>

            <Button mt="sm" size="xs" onClick={close} bg='#FCB3AD' c='black'>
              Закрыть
            </Button>
          </>
        ) : (
          <>
            <Text fw={500} mb="xs">
              Ответ AI:
            </Text>

            <Text size="sm" style={{ whiteSpace: "pre-line" }}>{aiText}</Text>

            <Group mt="md">
              <Button
                size="xs"
                onClick={() => {
                  if (aiText) {
                    const parsed = parsePrice(aiText)
                    if (parsed) onApply(parsed)
                  }
                  close()
                }}
              >
                Применить
              </Button>

              <Button size="xs" variant="default" onClick={close}>
                Закрыть
              </Button>
            </Group>
          </>
        )}
      </Popover.Dropdown>
    </Popover>
  )
}