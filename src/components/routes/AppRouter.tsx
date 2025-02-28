import { ProfilePage } from 'pages/ProfilePage/ProfilePage'
import { TodoListPage } from 'pages/TodoListPage/TodoListPage'
import { Route, Routes } from 'react-router'

export const AppRouter = () => {
    return (
        <div className="page-content">
            <Routes>
                <Route path="/" element={<TodoListPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </div>
    )
}
