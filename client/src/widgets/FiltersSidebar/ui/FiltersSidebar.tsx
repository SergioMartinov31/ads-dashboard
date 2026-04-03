import { Checkbox, Stack, Title, Switch, Button } from '@mantine/core'

type Props = {
  categories: string[]
  onCategoriesChange: (v: string[]) => void
  onlyNeedsRevision: boolean
  onNeedsRevisionChange: (v: boolean) => void
}

const allCategories = [
  { value: 'auto', label: 'Авто' },
  { value: 'electronics', label: 'Электроника' },
  { value: 'real_estate', label: 'Недвижимость' },
]

export const FiltersSidebar = ({
  categories,
  onCategoriesChange,
  onlyNeedsRevision,
  onNeedsRevisionChange,
}: Props) => {
  const toggleCategory = (value: string) => {
    if (categories.includes(value)) {
      onCategoriesChange(categories.filter((c) => c !== value))
    } else {
      onCategoriesChange([...categories, value])
    }
  }

  return (
    <div>
      <Title order={4} mb="sm">
        Фильтры
      </Title>

      <Stack>
        <div>
          <b>Категория</b>
          <Stack mt="xs">
            {allCategories.map((cat) => (
              <Checkbox
                key={cat.value}
                label={cat.label}
                checked={categories.includes(cat.value)}
                onChange={() => toggleCategory(cat.value)}
              />
            ))}
          </Stack>
        </div>

        <Switch
          label="Только требующие доработки"
          checked={onlyNeedsRevision}
          onChange={(e) =>
            onNeedsRevisionChange(e.currentTarget.checked)
          }
        />

        <Button
          variant="light"
          onClick={() => {
            onCategoriesChange([])
            onNeedsRevisionChange(false)
          }}
        >
          Сбросить фильтры
        </Button>
      </Stack>
    </div>
  )
}