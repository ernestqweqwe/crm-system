import { Route, Routes } from 'react-router'
import { TodoListPage } from '../../pages/TodoListPage/TodoListPage'
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage'
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage.tsx'

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
