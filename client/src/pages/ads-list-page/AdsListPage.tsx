import {useState} from 'react' 
import { useGetAdsQuery } from '@/entities/ad/api/adApi'
import { AdsToolbar } from '@/widgets/AdsToolbar/ui/AdsToolbar'
import { AdsList } from '@/widgets/AdsList/ui/AdsList'
import { useDebounce } from '@/features/ads-search/model/useDebounce'
import {FiltersSidebar} from '@/widgets/FiltersSidebar/ui/FiltersSidebar'
import { Pagination } from '@mantine/core'

import './AdsListPage.scss'



export const AdsListPage = () => {
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [categories, setCategories] = useState<string[]>([])
  const [onlyNeedsRevision, setOnlyNeedsRevision] = useState(false)

  const [page, setPage] = useState(0)
  const limit = 10

   const [sort, setSort] = useState<{
    sortColumn?: 'title' | 'createdAt'
    sortDirection?: 'asc' | 'desc'
  }>({})

  const debouncedQuery = useDebounce(query, 500)

    const { data, isLoading, isFetching, error } = useGetAdsQuery({
      q: debouncedQuery,
      limit: limit,
      skip: page * limit,
      needsRevision: onlyNeedsRevision ? true : false,
      categories: categories.length ? categories.join(',') : undefined,
      sortColumn: sort.sortColumn,
      sortDirection: sort.sortDirection,
    })

  if (error) return <div>Error</div>

  const totalPages = Math.ceil((data?.total || 0) / limit)

  return (
    <>
      <header className="header">
        <h1>Мои объявления</h1>
        <span>{data?.total} объявлений</span>
      </header>
      <AdsToolbar
        query={query}
        onQueryChange={setQuery}
        view={view}
        onViewChange={setView}
        onSortChange={setSort}
      />
      <div className="page-layout">
        <FiltersSidebar
          categories={categories}
          onCategoriesChange={setCategories}
          onlyNeedsRevision={onlyNeedsRevision}
          onNeedsRevisionChange={setOnlyNeedsRevision}
        />
        <div style={{ flex: 1 }}>
          <AdsList data={data} view={view} isLoading={isLoading} isFetching={isFetching}/>

          <Pagination
            mt="md"
            value={page + 1}
            onChange={(p) => setPage(p - 1)}
            total={totalPages}
          />
        </div>
        
      </div>
    </>
  )
}