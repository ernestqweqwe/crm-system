import { BrowserRouter, Route, Routes } from 'react-router'
import '../styles/App.css'
import { TodoListPage } from '../pages/TodoListPage/TodoListPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<TodoListPage />} path="/" />
            </Routes>
        </BrowserRouter>
    )
}

export default App
