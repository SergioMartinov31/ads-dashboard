import { TextInput, Group, ActionIcon, Select } from '@mantine/core'
import { IconLayoutGrid, IconList } from '@tabler/icons-react'

type Props = {
  query: string
  onQueryChange: (v: string) => void
  view: 'grid' | 'list'
  onViewChange: (v: 'grid' | 'list') => void
  onSortChange: (v: any) => void
}

export const AdsToolbar = ({
  query,
  onQueryChange,
  view,
  onViewChange,
  onSortChange,
}: Props) => {
  return (
    <Group justify="space-between" mb="md">
      <TextInput
        placeholder="Найти объявление..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        style={{ flex: 1 }}
      />

      <ActionIcon
        variant={view === 'grid' ? 'filled' : 'default'}
        onClick={() => onViewChange('grid')}
      >
        <IconLayoutGrid />
      </ActionIcon>

      <ActionIcon
        variant={view === 'list' ? 'filled' : 'default'}
        onClick={() => onViewChange('list')}
      >
        <IconList />
      </ActionIcon>

      <Select
        placeholder="Сортировка"
        data={[
          { value: 'createdAt-desc', label: 'Сначала новые' },
          { value: 'createdAt-asc', label: 'Сначала старые' },
          { value: 'title-asc', label: 'A → Я' },
          { value: 'title-desc', label: 'Я → A' },
        ]}
        onChange={(value) => {
          if (!value) return
          const [sortColumn, sortDirection] = value.split('-')

          onSortChange({
            sortColumn,
            sortDirection,
          })
        }}
      />
    </Group>
  )
}
