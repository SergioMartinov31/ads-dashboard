import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AdsListPage } from '@/pages/ads-list-page'
import { AdViewPage } from '@/pages/ad-view-page'
import { AdEditPage } from '@/pages/ad-edit-page'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/ads" replace />} />
        <Route path="/ads" element={<AdsListPage />} />
        <Route path="/ads/:id" element={<AdViewPage />} />
        <Route path="/ads/:id/edit" element={<AdEditPage />} />
      </Routes>
    </BrowserRouter>
  )
}