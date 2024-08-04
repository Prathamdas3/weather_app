import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const HomePage = lazy(() => import('./pages/HomePage'))

export default function Router() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
