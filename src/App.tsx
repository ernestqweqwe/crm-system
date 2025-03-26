import './App.scss'
import { RouterProvider } from 'react-router-dom'
import { useAppDispatch } from 'src/store/hooks/redux.ts'
import { useEffect } from 'react'
import { checkAuthStatus } from 'src/store/reducers/slices/sessionSlice/sessionAsyncThunks.ts'
import { createBrowserRouter } from 'react-router'
import { NotFoundPage } from 'src/pages/NotFoundPage/NotFoundPage.tsx'
import { TodoListPage } from 'src/pages/TodoListPage/TodoListPage.tsx'
import { ProfilePage } from 'src/pages/ProfilePage/ProfilePage.tsx'
import { RegistrationPage } from 'src/pages/RegistrationPage/RegistrationPage.tsx'
import { LoginPage } from 'src/pages/LoginPage/LoginPage.tsx'
import PrivateRouter from 'src/components/routes/PrivateRouter.tsx'
import { RootRouter } from 'src/components/routes/RootRouter.tsx'
import { RoleRouter } from 'src/components/routes/RoleRouter.tsx'
import { Roles } from 'src/types/usersTypes.ts'
import { UsersPage } from 'src/pages/UsersPage'
import { UserPage } from 'src/pages/UserPage/UserPage.tsx'

const router = createBrowserRouter([
    {
        element: <PrivateRouter />,
        errorElement: <NotFoundPage />,
        children: [
            {
                element: <RootRouter />,
                children: [
                    {
                        path: '/',
                        element: <TodoListPage />,
                    },
                    {
                        path: 'profile',
                        element: <ProfilePage />,
                    },
                    {
                        element: <RoleRouter allowedRoles={[Roles.ADMIN]} />,
                        children: [
                            {
                                path: 'users',
                                element: <UsersPage />,
                            },
                            {
                                path: 'users/:id',
                                element: <UserPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: '/registration',
        element: <RegistrationPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
])

export const App = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(checkAuthStatus())
    }, [])
    return <RouterProvider router={router} />
}
