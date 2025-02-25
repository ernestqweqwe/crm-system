import { BrowserRouter, Route, Routes } from 'react-router'
import { TodoListPage } from './pages/TodoListPage/TodoListPage'
import './App.css'

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
