import { Select, Stack, TextInput } from "@mantine/core"

import type {ElectronicsItemParams} from "@/entities/ad/types";

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
      />

      <TextInput
        label="Бренд"
        value={params.brand || ''}
        onChange={(e) =>
          setParams({ ...params, brand: e.target.value })
        }
      />

      <TextInput
        label="Модель"
        value={params.model || ''}
        onChange={(e) =>
          setParams({ ...params, model: e.target.value })
        }
      />

      <TextInput
        label="Цвет"
        value={params.color || ''}
        onChange={(e) =>
          setParams({ ...params, color: e.target.value })
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
      />
    </Stack>
  )
}
