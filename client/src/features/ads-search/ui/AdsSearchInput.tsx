import { TextInput } from '@mantine/core'

type Props = {
  query: string
  onQueryChange: (value: string) => void
}

export const AdsSearchInput = ({ query, onQueryChange }: Props) => {
  return (
    <TextInput
      placeholder="Найти объявление..."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
    />
  )
}