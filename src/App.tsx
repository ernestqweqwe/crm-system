import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.scss'
import { RootRouter } from 'src/components/routes/RootRouter.tsx'
import { TodoListPage } from 'src/pages/TodoListPage/TodoListPage.tsx'
import {
    loader as profileLoader,
    ProfilePage,
} from 'src/pages/ProfilePage/ProfilePage.tsx'
import { RegistrationPage } from 'src/pages/RegistrationPage/RegistrationPage.tsx'
import { LoginPage } from 'src/pages/LoginPage/LoginPage.tsx'

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootRouter />,
            errorElement: <NotFoundPage />,
            children: [
                {
                    index: true,
                    element: <TodoListPage />,
                },
                {
                    path: 'profile',
                    element: <ProfilePage />,
                    loader: profileLoader,
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
    return <RouterProvider router={router}></RouterProvider>
}

export default App
