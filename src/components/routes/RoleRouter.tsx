import { useAppSelector } from 'src/store/hooks/redux.ts'
import { FC } from 'react'
import { Roles } from 'src/types/usersTypes.ts'
import { Outlet } from 'react-router'
import { Navigate } from 'react-router-dom'

interface RoleRouterProps {
    allowedRoles: Roles[]
}

export const RoleRouter: FC<RoleRouterProps> = ({ allowedRoles }) => {
    const userRoles = useAppSelector((state) => state.user.profile?.roles)
    const isLoading = useAppSelector((state) => state.user.isLoading)
    const hasAccess = userRoles?.some((role) => allowedRoles.includes(role))

    if (isLoading) return null

    return hasAccess ? <Outlet /> : <Navigate to={'/*'} />
}
