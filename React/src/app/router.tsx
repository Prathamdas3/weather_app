import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
const ErrorPage = lazy(() => import('./pages/ErrorPage'))
const HomePage = lazy(() => import('./pages/HomePage'))

export default function Router() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  )
}
