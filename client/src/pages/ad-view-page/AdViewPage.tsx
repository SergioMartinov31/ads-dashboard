import { useParams, useNavigate } from "react-router-dom"
import { useGetAdByIdQuery } from "@/entities/ad/api/adApi"
import {
  Container,
  Title,
  Text,
  Button,
  Image,
  Grid,
  Card,
  Skeleton
} from "@mantine/core"

export const AdViewPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, error } = useGetAdByIdQuery({
    id: Number(id),
  })

  if (isLoading) {
    return (
      <Container size="lg">
        <Skeleton height={40} mb="md" />
        <Skeleton height={300} />
      </Container>
    )
  }

  if (error || !data) return <div>Error</div>

  const formatDate = (value?: string) => {
    if (!value) return '—'
    return new Date(value).toLocaleString()
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'auto': return 'Авто'
      case 'real_estate': return 'Недвижимость'
      case 'electronics': return 'Электроника'
      default: return category
    }
  }

  const renderCharacteristics = () => {
    switch (data.category) {
      case 'auto':
        return (
          <>
            {'brand' in data.params && (
              <>
                <Text c="dimmed">Бренд</Text>
                <Text>{data.params.brand || '—'}</Text>
              </>
            )}
            {'model' in data.params && (
              <>
                <Text c="dimmed">Модель</Text>
                <Text>{data.params.model || '—'}</Text>
              </>
            )}
            {'yearOfManufacture' in data.params && (
              <>
                <Text c="dimmed">Год выпуска</Text>
                <Text>{data.params.yearOfManufacture || '—'}</Text>
              </>
            )}
            {'transmission' in data.params && (
              <>
                <Text c="dimmed">Коробка передач</Text>
                <Text>
                  {data.params.transmission === 'automatic' ? 'Автомат' : 
                   data.params.transmission === 'manual' ? 'Механика' : '—'}
                </Text>
              </>
            )}
            {'mileage' in data.params && (
              <>
                <Text c="dimmed">Пробег</Text>
                <Text>{data.params.mileage ? `${data.params.mileage} км` : '—'}</Text>
              </>
            )}
            {'enginePower' in data.params && (
              <>
                <Text c="dimmed">Мощность двигателя</Text>
                <Text>{data.params.enginePower ? `${data.params.enginePower} л.с.` : '—'}</Text>
              </>
            )}
          </>
        )

      case 'real_estate':
        return (
          <>
            {'type' in data.params && (
              <>
                <Text c="dimmed">Тип</Text>
                <Text>
                  {data.params.type === 'flat' ? 'Квартира' :
                   data.params.type === 'house' ? 'Дом' :
                   data.params.type === 'room' ? 'Комната' : '—'}
                </Text>
              </>
            )}
            {'address' in data.params && (
              <>
                <Text c="dimmed">Адрес</Text>
                <Text>{data.params.address || '—'}</Text>
              </>
            )}
            {'area' in data.params && (
              <>
                <Text c="dimmed">Площадь</Text>
                <Text>{data.params.area ? `${data.params.area} м²` : '—'}</Text>
              </>
            )}
            {'floor' in data.params && (
              <>
                <Text c="dimmed">Этаж</Text>
                <Text>{data.params.floor || '—'}</Text>
              </>
            )}
          </>
        )

      case 'electronics':
        return (
          <>
            {'type' in data.params && (
              <>
                <Text c="dimmed">Тип</Text>
                <Text>
                  {data.params.type === 'phone' ? 'Телефон' :
                   data.params.type === 'laptop' ? 'Ноутбук' :
                   data.params.type === 'misc' ? 'Другое' : '—'}
                </Text>
              </>
            )}
            {'brand' in data.params && (
              <>
                <Text c="dimmed">Бренд</Text>
                <Text>{data.params.brand || '—'}</Text>
              </>
            )}
            {'model' in data.params && (
              <>
                <Text c="dimmed">Модель</Text>
                <Text>{data.params.model || '—'}</Text>
              </>
            )}
            {'color' in data.params && (
              <>
                <Text c="dimmed">Цвет</Text>
                <Text>{data.params.color || '—'}</Text>
              </>
            )}
            {'condition' in data.params && (
              <>
                <Text c="dimmed">Состояние</Text>
                <Text>
                  {data.params.condition === 'new' ? 'Новое' :
                   data.params.condition === 'used' ? 'Б/у' : '—'}
                </Text>
              </>
            )}
          </>
        )

      default:
        return null
    }
  }

  const getMissingFields = () => {
    const missing: string[] = []
    const params = data.params

    switch (data.category) {
      case 'auto':
        if (!params.brand) missing.push('Бренд')
        if (!params.model) missing.push('Модель')
        if (!params.yearOfManufacture) missing.push('Год выпуска')
        if (!params.transmission) missing.push('Коробка передач')
        if (!params.mileage) missing.push('Пробег')
        if (!params.enginePower) missing.push('Мощность двигателя')
        break
      case 'real_estate':
        if (!params.type) missing.push('Тип')
        if (!params.address) missing.push('Адрес')
        if (!params.area) missing.push('Площадь')
        if (!params.floor) missing.push('Этаж')
        break
      case 'electronics':
        if (!params.type) missing.push('Тип')
        if (!params.brand) missing.push('Бренд')
        if (!params.model) missing.push('Модель')
        if (!params.color) missing.push('Цвет')
        if (!params.condition) missing.push('Состояние')
        break
    }

    return missing
  }

  const missingFields = getMissingFields()
  const hasMissingFields = missingFields.length > 0

  return (
    <Container size="lg" style={{marginInline: 0, maxWidth: '100%', backgroundColor: '#FFFFFF'} }>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: '32px' }}>
        <div>
          <Title order={2}>{data.title}</Title>

          <Button
            mt="sm"
            onClick={() => navigate(`/ads/${id}/edit`)}
          >
            Редактировать
          </Button>
        </div>

        <div style={{ textAlign: "right" }}>
          <Title order={3}>{data.price} ₽</Title>

          <Text size="sm" c="dimmed">
            Опубликовано: {formatDate(data.createdAt)}
          </Text>
          <Text size="sm" c="dimmed">
            Обновлено: {formatDate(data.updatedAt)}
          </Text>
        </div>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <Grid align="flex-start">
        <Grid.Col span={4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            <Image
              src="https://placehold.co/600x400"
              height={320}
              fit="contain"
              radius="md"
            />

            <div>
              <Title order={4} mb="sm">Описание</Title>
              <Text>{data.description}</Text>
            </div>

          </div>
        </Grid.Col>

        <Grid.Col span={5}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {hasMissingFields && data.needsRevision && (
              <Card withBorder radius="md" style={{ background: "#fff4e6" }}>
                <Text fw={500} mb={5}>
                  ⚠️ Требуются доработки
                </Text>

                <Text size="sm">
                  У объявления не заполнены поля:
                </Text>

                <ul style={{ marginTop: 5 }}>
                  {missingFields.map((field, index) => (
                    <li key={index}>{field}</li>
                  ))}
                </ul>
              </Card>
            )}

            <div>
              <Title order={4} mb="sm">Характеристики</Title>

              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', rowGap: 8 }}>
                <Text c="dimmed">Категория</Text>
                <Text>{getCategoryLabel(data.category)}</Text>

                {renderCharacteristics()}
              </div>
            </div>

          </div>
        </Grid.Col>
      </Grid>
    </Container>
  )
}