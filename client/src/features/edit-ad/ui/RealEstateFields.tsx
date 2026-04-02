import type {RealEstateItemParams} from "@/entities/ad/types";

type Props = {
  params: RealEstateItemParams
  setParams: (params: RealEstateItemParams) => void
}

export const RealEstateFields = ({ params, setParams }: Props) => {
  return (
    <div>
      <h3>Real estate params</h3>

      <select
        value={params.type || 'flat'}
        onChange={(e) =>
          setParams({ ...params, type: e.target.value as RealEstateItemParams['type'] })
        }
      >
        <option value="flat">Flat</option>
        <option value="house">House</option>
        <option value="room">Room</option>
       </select>

      <input
        placeholder="Address"
        value={params.address || ''}
        onChange={(e) =>
          setParams({ ...params, address: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Area (sq.m.)"
        value={params.area || ''}
        onChange={(e) =>
          setParams({ ...params, area: Number(e.target.value) })
        }
      />

      <input
        type="number"
        placeholder="Floor"
        value={params.floor || ''}
        onChange={(e) =>
          setParams({ ...params, floor: Number(e.target.value) })
        }
      />

    </div>
  )
}