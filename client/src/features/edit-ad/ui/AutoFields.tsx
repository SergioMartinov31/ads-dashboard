import { NumberInput, Select, Stack, TextInput } from "@mantine/core"

import type {AutoItemParams} from "@/entities/ad/types";

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

      <NumberInput
        label="Год выпуска"
        value={params.yearOfManufacture || ''}
        onChange={(value) =>
          setParams({
            ...params,
            yearOfManufacture: typeof value === 'number' ? value : undefined,
          })
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
      />
    </Stack>
  )
}
