import { Suspense } from 'react'
import { SideBar } from './components/SideBar/SideBar.tsx'
import { AppRouter } from './components/routes/AppRouter.tsx'
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage.tsx'
import { Route, Routes } from 'react-router'
import './App.scss'
import { LoginPage } from './pages/LoginPage/LoginPage.tsx'

function App() {
    return (
        <Suspense fallback="">
            <Routes>
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/*"
                    element={
                        <div className="content">
                            <SideBar />
                            <AppRouter />
                        </div>
                    }
                />
            </Routes>
        </Suspense>
    )
}

export default App
