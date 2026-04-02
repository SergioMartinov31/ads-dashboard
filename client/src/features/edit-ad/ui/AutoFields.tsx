import type {AutoItemParams} from "@/entities/ad/types";

type Props = {
  params: AutoItemParams
  setParams: (params: AutoItemParams) => void
}

export const AutoFields = ({ params, setParams }: Props) => {
  return (
    <div>
      <h3>Auto params</h3>

      <input
        placeholder="Brand"
        value={params.brand || ''}
        onChange={(e) =>
          setParams({ ...params, brand: e.target.value })
        }
      />

      <input
        placeholder="Model"
        value={params.model || ''}
        onChange={(e) =>
          setParams({ ...params, model: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Year"
        value={params.yearOfManufacture || ''}
        onChange={(e) =>
          setParams({
            ...params,
            yearOfManufacture: Number(e.target.value),
          })
        }
      />

      <select 
        value={params.transmission || 'manual'}
        onChange={(e) =>
          setParams({ ...params, transmission: e.target.value as AutoItemParams['transmission'] })
        }
      >
        <option value="automatic">Automatic</option>
        <option value="manual">Manual</option>
      </select>
    
      <input
        type="number"
        placeholder="Mileage"
        value={params.mileage || ''}
        onChange={(e) =>
          setParams({ ...params, mileage: Number(e.target.value) })
        }
      />

      <input
        type="number"
        placeholder="Engine Power"
        value={params.enginePower || ''}
        onChange={(e) =>
          setParams({ ...params, enginePower: Number(e.target.value) })
        }
      />
    </div>
  )
}