import type {ElectronicsItemParams} from "@/entities/ad/types";

type Props = {
  params: ElectronicsItemParams
  setParams: (params: ElectronicsItemParams) => void
}

export const ElectronicsFields = ({ params, setParams }: Props) => {
  return (
    <div>
      <h3>Electronics params</h3>

      <select
        value={params.type || 'phone'}
        onChange={(e) =>
          setParams({ ...params, type: e.target.value as ElectronicsItemParams['type'] })
        }
      >
        <option value="phone">Phone</option>
        <option value="laptop">Laptop</option>
        <option value="misc">Misc</option>
      </select>

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

      <select
        value={params.condition || 'used'}
        onChange={(e) =>
          setParams({ ...params, condition: e.target.value as ElectronicsItemParams['condition'] })
        }
      >
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>

      <input
        placeholder="Color"
        value={params.color || ''}
        onChange={(e) =>
          setParams({ ...params, color: e.target.value })
        }
      />

    </div>
  )
}