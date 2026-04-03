export type AdCategory = 'auto' | 'real_estate' | 'electronics'


// базовые поля для всех объявлений

export type BaseAd = {
  title: string
  description?: string
  price: number
}

// для категории "авто" нужны такие параметры
export type AutoItemParams = {
  brand?: string
  model?: string
  yearOfManufacture?: number
  transmission?: 'automatic' | 'manual'
  mileage?: number
  enginePower?: number
}

// для категории "недвижимость" нужны такие параметры
export type RealEstateItemParams = {
  type?: 'flat' | 'house' | 'room'
  address?: string
  area?: number
  floor?: number
}

// для категории "электроника" нужны такие параметры
export type ElectronicsItemParams = {
  type?: 'phone' | 'laptop' | 'misc'
  brand?: string
  model?: string
  condition?: 'new' | 'used'
  color?: string
}



// объединяем базовые поля с параметрами конкретной категории получаем полную модель объявления
export type Ad =
  | (BaseAd & {
      category: 'auto'
      params: AutoItemParams
    })
  | (BaseAd & {
      category: 'real_estate'
      params: RealEstateItemParams
    })
  | (BaseAd & {
      category: 'electronics'
      params: ElectronicsItemParams
    })


// элемент списка который выведется при Get /items
export type AdListItem = {
  id: number
  category: AdCategory
  title: string
  price: number
  needsRevision: boolean
}


// ответ сервера при запросе списка объявлений Get /items
export type AdsListResponse = {
  items: AdListItem[]
  total: number
}
// ответ сервера при запросе деталей объявления Get /items/:id
export type AdDetailsResponse = Ad & {
  needsRevision: boolean
  createdAt?: string
  updatedAt?: string
}

// тело запроса к get items/:id
export type GetAdByIdParams = {
  id: number
}

// параметры для запроса списка объявлений Get /items
export type AdsListParams = {
  q?: string
  limit?: number
  skip?: number
  needsRevision?: boolean
  categories?: string
  sortColumn?: 'title' | 'createdAt'
  sortDirection?: 'asc' | 'desc'
}


// полезно для формы редактирования объявления, так как при редактировании может измениться категория, а значит и набор полей
export type UpdateAdPayload =
  | {
      category: 'auto'
      title: string
      description?: string
      price: number
      params: AutoItemParams
    }
  | {
      category: 'real_estate'
      title: string
      description?: string
      price: number
      params: RealEstateItemParams
    }
  | {
      category: 'electronics'
      title: string
      description?: string
      price: number
      params: ElectronicsItemParams
    }
