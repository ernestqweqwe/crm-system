import { useAppSelector } from 'src/store/hooks/redux.ts'
import { Outlet } from 'react-router'
import { Navigate } from 'react-router-dom'

const PrivateRouter = () => {
    const isAuth = useAppSelector((state) => state.session.isAuth)
    const isLoading = useAppSelector((state) => state.session.isLoading)

    if (isLoading) return null

    return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRouter
