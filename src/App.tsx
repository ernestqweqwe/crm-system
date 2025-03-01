import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage'
import { Suspense, useEffect } from 'react'
import { SideBar } from 'components/SideBar/SideBar'
import { AppRouter } from 'components/routes/AppRouter'
import { RegistrationPage } from 'pages/RegistrationPage/RegistrationPage'
import { Route, Routes } from 'react-router'
import './App.scss'
import { LoginPage } from 'pages/LoginPage/LoginPage'
import { useAppDispatch } from 'store/hooks/redux'
import { checkIsAuth } from 'store/reducers/slices/authSlice/asyncThunks'

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(checkIsAuth())
        }
    }, [])
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
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}

export default App
