import { Link } from 'react-router-dom'
import { Card, Text, Container, SimpleGrid, Image, Badge, Skeleton, Loader} from '@mantine/core'
import type {AdsListResponse} from "@/entities/ad/types"



const categoryMap = {
  auto: 'Транспорт',
  real_estate: 'Недвижимость',
  electronics: 'Электроника',
}

type AdsListProps = {
  data?: AdsListResponse
  view: 'grid' | 'list'
  isLoading?: boolean
  isFetching?: boolean
}

export const AdsList = ( {data, view, isLoading, isFetching} : AdsListProps) => {
  if (isLoading) {
    return (
      <Container className='cards-container' size="sm">
        <Skeleton height={500} radius="md" />
      </Container>
    )
  }

  
  if (!data) return null

  return (
    <Container className='cards-container' size="sm" style={{ position: 'relative' }}>

      {isFetching && (
        <div 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.286)',
          zIndex: 10,
        }}>
          <Loader size="sm" />
        </div>
      )}
      <div style={{ opacity: isFetching ? 0.6 : 1, transition: '0.2s' }}>
        <SimpleGrid className='cards-layout' cols={view === 'grid' ? 5 : 1} spacing="md">
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
      </div>
    </Container>
  )
}