import { NumberInput, Select, Stack, TextInput, ActionIcon } from "@mantine/core"
import { IconX } from "@tabler/icons-react"
import type { AutoItemParams } from "@/entities/ad/types";

type Props = {
  params: AutoItemParams
  setParams: (params: AutoItemParams) => void
}

export const AutoFields = ({ params, setParams }: Props) => {
  return (
    <Stack maw={640}>
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

      <NumberInput
        label="Год выпуска"
        value={params.yearOfManufacture || ''}
        onChange={(value) =>
          setParams({
            ...params,
            yearOfManufacture: typeof value === 'number' ? value : undefined,
          })
        }
        rightSection={
          params.yearOfManufacture && (
            <ActionIcon onClick={() => setParams({ ...params, yearOfManufacture: undefined })} variant="subtle" color="gray">
              <IconX size={16} />
            </ActionIcon>
          )
        }
      />

      <Select
        label="Коробка передач"
        value={params.transmission || null}
        data={[
          { value: 'automatic', label: 'Автомат' },
          { value: 'manual', label: 'Механика' },
        ]}
        onChange={(value) =>
          setParams({
            ...params,
            transmission: (value ?? undefined) as AutoItemParams['transmission'],
          })
        }
      />
    
      <NumberInput
        label="Пробег"
        value={params.mileage || ''}
        onChange={(value) =>
          setParams({
            ...params,
            mileage: typeof value === 'number' ? value : undefined,
          })
        }
        rightSection={
          params.mileage && (
            <ActionIcon onClick={() => setParams({ ...params, mileage: undefined })} variant="subtle" color="gray">
              <IconX size={16} />
            </ActionIcon>
          )
        }
      />

      <NumberInput
        label="Мощность двигателя"
        value={params.enginePower || ''}
        onChange={(value) =>
          setParams({
            ...params,
            enginePower: typeof value === 'number' ? value : undefined,
          })
        }
        rightSection={
          params.enginePower && (
            <ActionIcon onClick={() => setParams({ ...params, enginePower: undefined })} variant="subtle" color="gray">
              <IconX size={16} />
            </ActionIcon>
          )
        }
      />
    </Stack>
  )
}