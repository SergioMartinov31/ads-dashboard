import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useGetAdByIdQuery, useUpdateAdMutation } from "@/entities/ad/api/adApi"
import type {
  AdCategory,
  AutoItemParams,
  ElectronicsItemParams,
  RealEstateItemParams,
  UpdateAdPayload,
} from "@/entities/ad/types"

import { AutoFields } from "@/features/edit-ad/ui/AutoFields"
import { RealEstateFields } from "@/features/edit-ad/ui/RealEstateFields"
import { ElectronicsFields } from "@/features/edit-ad/ui/ElectronicsFields"


type ParamsState = {
  auto: AutoItemParams
  real_estate: RealEstateItemParams
  electronics: ElectronicsItemParams
}

export const AdEditPage = () => {
  const [isDraftLoaded, setIsDraftLoaded] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate();
  
  const [category, setCategory] = useState<AdCategory>('auto')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [paramsState, setParamsState] = useState<ParamsState>({
    auto: {},
    real_estate: {},
    electronics: {},
  })
  const currentParams = paramsState[category]

  const {data, isLoading, error} = useGetAdByIdQuery({id: Number(id)})
  const [updateAd, { isLoading: isSaving }] = useUpdateAdMutation()

  const updateParams = (newParams: typeof currentParams) => {
    setParamsState((prev) => ({
      ...prev,
      [category]: newParams,
    }))
  }

  useEffect(() => {
    if (data && !isDraftLoaded) {
      setTitle(data.title)
      setDescription(data.description || "")
      setPrice(data.price)
      setCategory(data.category)
      setParamsState({
        auto: data.category === "auto" ? data.params : {},
        real_estate: data.category === "real_estate" ? data.params : {},
        electronics: data.category === "electronics" ? data.params : {},
      })
    }
  }, [data, isDraftLoaded])

  useEffect(() => {
    if (!id) return

    const saved = localStorage.getItem(`ad-draft-${id}`)
    if (saved) {
      const parsed = JSON.parse(saved)

      setTitle(parsed.title)
      setDescription(parsed.description)
      setPrice(parsed.price)
      setCategory(parsed.category)
      setParamsState(parsed.paramsState)

      setIsDraftLoaded(true)
    }
  }, [id])

  useEffect(() => {
  if (data || isDraftLoaded) {
    setIsInitialized(true)
  }
}, [data, isDraftLoaded])

  useEffect(() => {
    if (!id || !isInitialized) return

    localStorage.setItem(
      `ad-draft-${id}`,
      JSON.stringify({
        title,
        description,
        price,
        category,
        paramsState,
      })
    )
  }, [title, description, price, category, paramsState, id])

  const getPayloadByCategory = (): UpdateAdPayload => {
    switch (category) {
      case 'auto':
        return {
          category: 'auto',
          title,
          description,
          price,
          params: paramsState.auto,
        }
      case 'real_estate':
        return {
          category: 'real_estate',
          title,
          description,
          price,
          params: paramsState.real_estate,
        }
      case 'electronics':
        return {
          category: 'electronics',
          title,
          description,
          price,
          params: paramsState.electronics,
        }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!id) return

    try {
      await updateAd({
        id: Number(id),
        body: getPayloadByCategory(),
      }).unwrap()
    } catch (error) {
      console.error('Failed to update ad:', error)
      return
    }

    localStorage.removeItem(`ad-draft-${id}`)

    navigate(`/ads/${id}`)
  }

  const renderFields = () => {
    switch (category) {
      case "auto":
        return (
          <AutoFields
            params={currentParams as AutoItemParams}
            setParams={updateParams}
          />
        )
      case "real_estate":
        return (
          <RealEstateFields
            params={currentParams as RealEstateItemParams}
            setParams={updateParams}
          />
        )
      case "electronics":
        return (
          <ElectronicsFields
            params={currentParams as ElectronicsItemParams}
            setParams={updateParams}
          />
        )
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <div>
      <h1>AdEditPage</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category</label>
          <select 
          value={category} 
          onChange={(e) => {
            const newCategory = e.target.value as AdCategory
            setCategory(newCategory)
          }}>
            <option value="auto">Auto</option>
            <option value="real_estate">Real Estate</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
        <div>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" />
        </div>
        <div>
          <label>Price</label>
          <input value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} type="number" name="price" />
        </div>

        {renderFields()}
        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={() => navigate(`/ads/${id}`)}>Cancel</button>
      </form>
    </div>
  )
}
