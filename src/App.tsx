import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage'
import { Suspense } from 'react'
import { RegistrationPage } from 'pages/RegistrationPage/RegistrationPage'
import { Route, Routes } from 'react-router'
import './App.scss'
import { LoginPage } from 'pages/LoginPage/LoginPage'
import { PageRouter } from './components/routes/PageRouter'

function App() {
    return (
        <Suspense fallback="">
            <Routes>
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/*" element={<PageRouter />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}

export default App
