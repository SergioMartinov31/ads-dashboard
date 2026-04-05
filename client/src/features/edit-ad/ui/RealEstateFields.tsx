import { NumberInput, Select, Stack, TextInput, ActionIcon } from "@mantine/core"
import { IconX } from "@tabler/icons-react"
import type { RealEstateItemParams } from "@/entities/ad/types";

type Props = {
  params: RealEstateItemParams
  setParams: (params: RealEstateItemParams) => void
}

export const RealEstateFields = ({ params, setParams }: Props) => {
  return (
    <Stack maw={640}>
      <Select
        label="Тип"
        value={params.type || null}
        data={[
          { value: 'flat', label: 'Квартира' },
          { value: 'house', label: 'Дом' },
          { value: 'room', label: 'Комната' },
        ]}
        onChange={(value) =>
          setParams({
            ...params,
            type: (value ?? undefined) as RealEstateItemParams['type'],
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
        label="Адрес"
        value={params.address || ''}
        onChange={(e) => setParams({ ...params, address: e.target.value })}
        rightSection={
          params.address && (
            <ActionIcon onClick={() => setParams({ ...params, address: '' })} variant="subtle" color="gray">
              <IconX size={16} />
            </ActionIcon>
          )
        }
      />

      <NumberInput
        label="Площадь, м²"
        value={params.area || ''}
        onChange={(value) =>
          setParams({
            ...params,
            area: typeof value === 'number' ? value : undefined,
          })
        }
        rightSection={
          params.area && (
            <ActionIcon onClick={() => setParams({ ...params, area: undefined })} variant="subtle" color="gray">
              <IconX size={16} />
            </ActionIcon>
          )
        }
      />

      <NumberInput
        label="Этаж"
        value={params.floor || ''}
        onChange={(value) =>
          setParams({
            ...params,
            floor: typeof value === 'number' ? value : undefined,
          })
        }
        rightSection={
          params.floor && (
            <ActionIcon onClick={() => setParams({ ...params, floor: undefined })} variant="subtle" color="gray">
              <IconX size={16} />
            </ActionIcon>
          )
        }
      />
    </Stack>
  )
}