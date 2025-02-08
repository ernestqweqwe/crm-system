import TaskList from './components/TaskList/TaskList'
import { useTodos } from './hooks/useTodos'
import './styles/App.css'

function App() {
    const { todos, loading, error, handleDelete } = useTodos()

    if (loading) return <div>Loading...</div>
    if (error) return <div>Ошибка: {error}</div>

    return (
        <div className="app">
            {todos ? (
                <TaskList taskList={todos} onDelete={handleDelete} />
            ) : (
                <div>Нет задач</div>
            )}
        </div>
    )
}

export default App
