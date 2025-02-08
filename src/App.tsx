import TaskList from './components/TaskList/TaskList'
import { useTodos } from './hooks/useTodos'
import './styles/App.css'
import TaskForm from './components/TaskForm/TaskForm.tsx'

function App() {
    const { todos, loading, error, handleDelete, handleCreate } = useTodos()

    if (loading) return <div>Loading...</div>
    if (error) return <div>Ошибка: {error}</div>

    return (
        <div className="app">
            <TaskForm create={handleCreate} />
            {todos ? (
                <TaskList taskList={todos} onDelete={handleDelete} />
            ) : (
                <div>Нет задач</div>
            )}
        </div>
    )
}

export default App
