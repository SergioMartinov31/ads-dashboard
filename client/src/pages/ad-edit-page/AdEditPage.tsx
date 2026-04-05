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
  Notification,
  ActionIcon,
} from "@mantine/core"
import { IconCheck, IconX, IconTrash } from "@tabler/icons-react"

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
import { AiDescriptionButton } from "@/features/ai/ui/AiDescriptionButton"
import { AiPriceButton } from "@/features/ai/ui/AiPriceButton"

type ParamsState = {
  auto: AutoItemParams
  real_estate: RealEstateItemParams
  electronics: ElectronicsItemParams
}

export const AdEditPage = () => {
  const [isDraftLoaded, setIsDraftLoaded] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

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

  const isFormValid = () => {
    if (!title.trim()) return false
    if (price === '' || price === null || price <= 0) return false
    return true
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

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])


  const cleanParams = (params: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined
    )
  )
}

  const getPayloadByCategory = (): UpdateAdPayload => {
  const cleanedParams = cleanParams(paramsState[category])

  switch (category) {
    case 'auto':
      return { category, title, description, price: Number(price), params: cleanedParams }
    case 'real_estate':
      return { category, title, description, price: Number(price), params: cleanedParams }
    case 'electronics':
      return { category, title, description, price: Number(price), params: cleanedParams }
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
      
      setNotification({
        type: 'success',
        message: 'Изменения сохранены'
      })
      
      localStorage.removeItem(`ad-draft-${id}`)
      
      setTimeout(() => {
        navigate(`/ads/${id}`)
      }, 1000)
      
    } catch (e) {
      setNotification({
        type: 'error',
        message: 'При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.'
      })
    }
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
  const isSaveDisabled = !isFormValid() || isSaving
  const isDescriptionEmpty = !description

  return (
    <Container size="md" mt="lg" style={{marginInline: 0, maxWidth: '100%', backgroundColor: '#FFFFFF'} }>
      {notification && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
          <Notification
            icon={notification.type === 'success' ? <IconCheck size={18} /> : <IconX size={18} />}
            color={notification.type === 'success' ? 'teal' : 'red'}
            title={notification.type === 'success' ? 'Изменения сохранены' : 'Ошибка сохранения'}
            onClose={() => setNotification(null)}
          >
            {notification.message}
          </Notification>
        </div>
      )}

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
                rightSection={
                  title && (
                    <ActionIcon onClick={() => setTitle('')} variant="subtle" color="gray">
                      <IconTrash size={16} />
                    </ActionIcon>
                  )
                }
              />

              <div />

              <Divider style={{ gridColumn: '1 / -1' }} />

              <NumberInput
                label="Цена"
                required
                value={price}
                onChange={(val) => setPrice(typeof val === 'number' ? val : '')}
                error={isPriceError && "Обязательное поле"}
                rightSection={
                  price !== '' && price !== null && (
                    <ActionIcon onClick={() => setPrice('')} variant="subtle" color="gray">
                      <IconTrash size={16} />
                    </ActionIcon>
                  )
                }
              />

              <AiPriceButton
                title={title}
                params={currentParams}
                onApply={(price) => setPrice(price)}
              />

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
                styles={{
                  input: {
                    borderColor: isDescriptionEmpty ? '#FFA940' : undefined,
                  },
                }}
                rightSection={
                  description && (
                    <ActionIcon onClick={() => setDescription('')} variant="subtle" color="gray" style={{ marginTop: 8 }}>
                      <IconTrash size={16} />
                    </ActionIcon>
                  )
                }
              />

              <AiDescriptionButton
                title={title}
                description={description}
                params={currentParams}
                onApply={(text) => setDescription(text)}
              />

              <div />

              <Group mt="md" style={{ gridColumn: '1 / 2' }}>
                <Button 
                  type="submit" 
                  loading={isSaving}
                  disabled={isSaveDisabled}
                >
                  Сохранить
                </Button>

                <Button
                  variant="default"
                  onClick={() => navigate(`/ads/${id}`)}
                >
                  Отменить
                </Button>
              </Group>
              
              {isSaveDisabled && !isSaving && (
                <Text size="xs" c="dimmed" style={{ gridColumn: '1 / 2' }}>
                  * Заполните название и цену для сохранения
                </Text>
              )}
            </div>
          </form>
      </Card>
    </Container>
  )
}