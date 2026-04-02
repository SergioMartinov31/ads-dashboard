import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  AdsListResponse,
  AdsListParams,
  AdDetailsResponse,
  UpdateAdPayload,
  GetAdByIdParams


} from '../types'


const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export const adApi = createApi({
  reducerPath: 'adApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  tagTypes: ['Ad'],
  endpoints: (builder) => ({
    getAds: builder.query<AdsListResponse, AdsListParams>({
      query: (params) => ({
        url: '/items',
        params,
      }),

      transformResponse: (response: AdsListResponse, _, arg) => {
      const skip = arg?.skip ?? 0

      return {
        ...response,
        items: response.items.map((item, index) => ({
          ...item,
          id: skip + index + 1,
        })),
      }
      },

      providesTags: ['Ad'],
    }),

    getAdById: builder.query<AdDetailsResponse, GetAdByIdParams >({
      query: ({ id }) => `/items/${id}`,
      providesTags: ['Ad'],
    }),

    updateAd: builder.mutation<
      { success: boolean },
      { id: number; body: UpdateAdPayload }
    >({
      query: ({ id, body }) => ({
        url: `/items/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Ad'],
    }),
  }),
})

export const {
  useGetAdsQuery,
  useGetAdByIdQuery,
  useUpdateAdMutation,
} = adApi
