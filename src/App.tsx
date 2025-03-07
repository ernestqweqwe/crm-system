import { PageRouter } from 'components/routes/PageRouter'
import { NotFoundPage } from 'pages/NotFoundPage/index'
import { Suspense } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router'

function App() {
    return (
        <Suspense fallback="">
            <Routes>
                <Route path="/*" element={<PageRouter />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}

export default App
