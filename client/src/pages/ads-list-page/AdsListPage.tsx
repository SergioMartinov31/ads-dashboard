import { useGetAdsQuery } from '@/entities/ad/api/adApi'
import { Link } from 'react-router-dom'
import { Card, Text, Container, SimpleGrid, Image, Badge, Group } from '@mantine/core'
import './AdsListPage.scss'

const categoryMap = {
  auto: 'Транспорт',
  real_estate: 'Недвижимость',
  electronics: 'Электроника',
}

export const AdsListPage = () => {
  const { data, isLoading, error } = useGetAdsQuery({ limit: 10 })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <Container className='cards-container' size="sm">
      <h1>Мои объявления ({data?.total})</h1>

      <SimpleGrid className='cards-layout' cols={5} spacing="md">
        {data?.items.map((ad) => (
          <Card
            key={ad.id}
            withBorder
            shadow="sm"
            radius="md"
            padding="lg"
            component={Link}
            to={`/ads/${ad.id}`}
            style={{ cursor: 'pointer' }}
          >
            <Card.Section>
              <Image
                src="https://placehold.co/600x400"
                height={160}
                alt="placeholder"
              />
            </Card.Section>

            <Text size="sm" c="dimmed">
                {categoryMap[ad.category]}
            </Text>
            <Text fw={500} size="lg" mb={5}>
              {ad.title}
            </Text>

            <Text size="xl" fw={700}>
              {ad.price} ₽
            </Text>
            {ad.needsRevision && (
                <Badge color="orange" variant="light">
                  Требует доработки
                </Badge>
            )}
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}