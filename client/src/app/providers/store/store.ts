import { configureStore } from '@reduxjs/toolkit'
import { adApi } from '@/entities/ad/api/adApi'

export const store = configureStore({
  reducer: {
    [adApi.reducerPath]: adApi.reducer,
  },
  middleware: (gDM) => gDM().concat(adApi.middleware),
})