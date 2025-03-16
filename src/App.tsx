import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage'
import { Suspense, useEffect } from 'react'
import { RegistrationPage } from 'pages/RegistrationPage/RegistrationPage'
import { Route, Routes } from 'react-router'
import './App.scss'
import { LoginPage } from 'pages/LoginPage/LoginPage'
import { PageRouter } from 'components/routes/PageRouter'
import { PrivateRoter } from 'components/routes/PrivateRoter'
import { useAppDispatch } from 'store/hooks/redux'
import { isAuth } from 'store/reducers/slices/authSlice/asyncThunks'
import { setLoading } from 'store/reducers/slices/authSlice/authSlice'

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (localStorage.getItem('refreshToken')) {
            dispatch(isAuth())
        } else {
            dispatch(setLoading(false))
        }
    }, [dispatch])
    return (
        <Suspense fallback="">
            <Routes>
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<PrivateRoter />}>
                    <Route path="/*" element={<PageRouter />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}

export default App
