import { Route, Routes } from 'react-router'
import { TodoListPage } from '../../pages/TodoListPage/TodoListPage'
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage'

export const AppRouter = () => {
    return (
        <div className="app-router">
            <Routes>
                <Route path="/" element={<TodoListPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </div>
    )
}
