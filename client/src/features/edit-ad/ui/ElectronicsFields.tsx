import { Select, Stack, TextInput, ActionIcon } from "@mantine/core"
import { IconX } from "@tabler/icons-react"
import type { ElectronicsItemParams } from "@/entities/ad/types";

type Props = {
  params: ElectronicsItemParams
  setParams: (params: ElectronicsItemParams) => void
}

export const ElectronicsFields = ({ params, setParams }: Props) => {
  return (
    <Stack maw={640}>
      <Select
        label="Тип"
        value={params.type || null}
        data={[
          { value: 'phone', label: 'Телефон' },
          { value: 'laptop', label: 'Ноутбук' },
          { value: 'misc', label: 'Другое' },
        ]}
        onChange={(value) =>
          setParams({
            ...params,
            type: (value ?? undefined) as ElectronicsItemParams['type'],
          })
        }
        rightSection={
          params.type && (
            <ActionIcon onClick={() => setParams({ ...params, type: undefined })} variant="subtle" color="gray">
              <IconX size={16} />
            </ActionIcon>
          )
        }
      />

      <TextInput
        label="Бренд"
        value={params.brand || ''}
        onChange={(e) => setParams({ ...params, brand: e.target.value })}
        rightSection={
          params.brand && (
            <ActionIcon onClick={() => setParams({ ...params, brand: '' })} variant="subtle" color="gray">
              <IconX size={16} />
            </ActionIcon>
          )
        }
      />

      <TextInput
        label="Модель"
        value={params.model || ''}
        onChange={(e) => setParams({ ...params, model: e.target.value })}
        rightSection={
          params.model && (
            <ActionIcon onClick={() => setParams({ ...params, model: '' })} variant="subtle" color="gray">
              <IconX size={16} />
            </ActionIcon>
          )
        }
      />

      <TextInput
        label="Цвет"
        value={params.color || ''}
        onChange={(e) => setParams({ ...params, color: e.target.value })}
        rightSection={
          params.color && (
            <ActionIcon onClick={() => setParams({ ...params, color: '' })} variant="subtle" color="gray">
              <IconX size={16} />
            </ActionIcon>
          )
        }
      />

      <Select
        label="Состояние"
        value={params.condition || null}
        data={[
          { value: 'new', label: 'Новое' },
          { value: 'used', label: 'Б/у' },
        ]}
        onChange={(value) =>
          setParams({
            ...params,
            condition: (value ?? undefined) as ElectronicsItemParams['condition'],
          })
        }
        rightSection={
          params.condition && (
            <ActionIcon onClick={() => setParams({ ...params, condition: undefined })} variant="subtle" color="gray">
              <IconX size={16} />
            </ActionIcon>
          )
        }
      />
    </Stack>
  )
}