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

  return (
    <Container size="lg" style={{marginInline: 0, maxWidth: '100%'}}>
      
      {/* 🔝 HEADER */}
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
        {/* 🔥 ЛЕВАЯ КОЛОНКА */}
        <Grid.Col span={4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {/* КАРТИНКА */}
            <Image
              src="https://placehold.co/600x400"
              height={320}
              fit="contain"
              radius="md"
            />

            {/* ОПИСАНИЕ */}
            <div>
              <Title order={4} mb="sm">Описание</Title>
              <Text>{data.description}</Text>
            </div>

          </div>
        </Grid.Col>

        {/* 🔥 ПРАВАЯ КОЛОНКА */}
        <Grid.Col span={5}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {/* ⚠️ WARNING */}
            {data.needsRevision && (
              <Card withBorder radius="md" style={{ background: "#fff4e6" }}>
                <Text fw={500} mb={5}>
                  ⚠️ Требуются доработки
                </Text>

                <Text size="sm">
                  У объявления не заполнены поля:
                </Text>

                <ul style={{ marginTop: 5 }}>
                  <li>Цвет</li>
                  <li>Состояние</li>
                </ul>
              </Card>
            )}

            {/* 📊 ХАРАКТЕРИСТИКИ */}
            <div>
              <Title order={4} mb="sm">Характеристики</Title>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', rowGap: 8 }}>
                <Text c="dimmed">Тип</Text>
                <Text>{data.category}</Text>

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
              </div>
            </div>

          </div>
        </Grid.Col>
      </Grid>
    </Container>
  )
}
