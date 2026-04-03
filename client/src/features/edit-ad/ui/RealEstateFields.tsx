import { NumberInput, Select, Stack, TextInput } from "@mantine/core"

import type {RealEstateItemParams} from "@/entities/ad/types";

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
      />

      <TextInput
        label="Адрес"
        value={params.address || ''}
        onChange={(e) =>
          setParams({ ...params, address: e.target.value })
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
      />
    </Stack>
  )
}
