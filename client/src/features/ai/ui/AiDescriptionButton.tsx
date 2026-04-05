import { Button, Popover, Text, Group } from "@mantine/core"
import { useAiDescription } from "../model/useAiDescription"
import { Loader } from "@mantine/core"

type Props = {
  title: string
  description: string
  params: unknown
  onApply: (text: string) => void
}

export const AiDescriptionButton = ({
  title,
  description,
  params,
  onApply,
}: Props) => {
  const {
    aiText,
    loading,
    error,
    wasUsed,
    generate,
    apply,
    close,
  } = useAiDescription()

  const getText = () => {
    if (loading) return "Выполняется запрос"
    if (wasUsed) return "Повторить запрос"
    if (!description) return "Придумать описание"
    return "Улучшить описание"
  }

  return (
    <Popover opened={!!aiText || !!error} withArrow offset={7}  position="right" >
      <Popover.Target>
        <Button variant="light" color="#FFA940" bg={'#F9F1E6'} disabled={loading} style={{width: 'fit-content'} } onClick={() => generate({ title, description, params })}>
          {loading ? (
            <>
              <Loader size="xs" mr={6} color="#FFA940" />
              <span style={{color: "#FFA940"}}>Выполняется запрос</span>
            </>
          ) : (
            <><span style={{color: "#FFA940"}}>💡 {getText()}</span></>
          )}
      </Button>
      </Popover.Target>

      <Popover.Dropdown bg={error ? '#FEE9E7' : '#FFFFFF'}   style={{ maxWidth: '70%', whiteSpace: "pre-line", wordBreak: "break-word", }}>
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
                  if (aiText) onApply(aiText)
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