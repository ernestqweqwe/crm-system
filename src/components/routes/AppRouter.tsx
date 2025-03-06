import { Route, Routes } from 'react-router'
import { TodoListPage } from 'pages/TodoListPage/ui/TodoListPage'
import { ProfilePage } from 'pages/ProfilePage/ui/ProfilePage'
import { NotFoundPage } from 'pages/NotFoundPage/ui/NotFoundPage'

export const AppRouter = () => {
    return (
        <div className="page-content">
            <Routes>
                <Route path="/" element={<TodoListPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    )
}
