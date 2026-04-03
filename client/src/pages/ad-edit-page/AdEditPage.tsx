import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useGetAdByIdQuery, useUpdateAdMutation} from "@/entities/ad/api/adApi"
import {
  Container,
  Title,
  TextInput,
  Textarea,
  NumberInput,
  Select,
  Button,
  Card,
  Divider,
  Group,
  Text,
} from "@mantine/core"

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
  const navigate = useNavigate()

  const [category, setCategory] = useState<AdCategory>('auto')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number | ''>('')

  const [paramsState, setParamsState] = useState<ParamsState>({
    auto: {},
    real_estate: {},
    electronics: {},
  })

  const currentParams = paramsState[category]

  const { data, isLoading, error } = useGetAdByIdQuery({ id: Number(id) })
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
        return { category, title, description, price: Number(price), params: paramsState.auto }
      case 'real_estate':
        return { category, title, description, price: Number(price), params: paramsState.real_estate }
      case 'electronics':
        return { category, title, description, price: Number(price), params: paramsState.electronics }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    try {
      await updateAd({
        id: Number(id),
        body: getPayloadByCategory(),
      }).unwrap()
    } catch (e) {
      return
    }

    localStorage.removeItem(`ad-draft-${id}`)
    navigate(`/ads/${id}`)
  }

  const renderFields = () => {
    switch (category) {
      case "auto":
        return <AutoFields params={currentParams as AutoItemParams} setParams={updateParams} />
      case "real_estate":
        return <RealEstateFields params={currentParams as RealEstateItemParams} setParams={updateParams} />
      case "electronics":
        return <ElectronicsFields params={currentParams as ElectronicsItemParams} setParams={updateParams} />
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  const isTitleError = !title
  const isPriceError = !price

  return (
    <Container size="md" mt="lg" style={{marginInline: 0, maxWidth: '100%'}}>

      <Card shadow="sm" padding="lg" radius="lg" withBorder>
        <Title order={2} mb="md">
          Редактирование объявления
        </Title>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '16px',
              }}
            >

              <Select
                label="Категория"
                value={category}
                onChange={(value) => setCategory(value as AdCategory)}
                data={[
                  { value: 'auto', label: 'Авто' },
                  { value: 'real_estate', label: 'Недвижимость' },
                  { value: 'electronics', label: 'Электроника' },
                ]}
              />

              <div />

              <Divider style={{ gridColumn: '1 / -1' }} />

              <TextInput
                label="Название"
                required
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                error={isTitleError && "Обязательное поле"}
              />

              <div />

              <Divider style={{ gridColumn: '1 / -1' }} />

              <NumberInput
                label="Цена"
                required
                value={price}
                onChange={(val) => setPrice(typeof val === 'number' ? val : '')}
                error={isPriceError && "Обязательное поле"}
              />

              <Button variant="light" color="orange" style={{ alignSelf: 'end', justifySelf: 'start' }}>
                💡 Узнать цену
              </Button>

              <Divider style={{ gridColumn: '1 / -1' }} />

              <div style={{ gridColumn: '1 / 2' }}>
                <Text fw={500} mb="sm">Характеристики</Text>
                {renderFields()}
              </div>

              <div />

              <Divider style={{ gridColumn: '1 / -1' }} />

              <Textarea
                label="Описание"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                minRows={4}
                style={{ gridColumn: '1 / -1' }}
              />

              <Button
                variant="light"
                color="orange"
                style={{ gridColumn: '1 / 2', width: 'fit-content' }}
              >
                💡 Улучшить описание
              </Button>

              <div />

              <Group mt="md" style={{ gridColumn: '1 / 2' }}>
                <Button type="submit" loading={isSaving}>
                  Сохранить
                </Button>

                <Button
                  variant="default"
                  onClick={() => navigate(`/ads/${id}`)}
                >
                  Отменить
                </Button>
              </Group>
            </div>
          </form>
      </Card>
    </Container>
  )
}
