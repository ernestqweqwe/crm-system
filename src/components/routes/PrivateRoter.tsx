import { Navigate, Outlet } from 'react-router'
import { useAppSelector } from 'src/store/hooks/redux'

export const PrivateRoter = () => {
    const { isAuth, isLoading } = useAppSelector((state) => state.auth)

    if (isLoading) return null

    return isAuth ? <Outlet /> : <Navigate to={'/login'} replace />
}
