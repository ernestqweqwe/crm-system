import TaskForm from '../../components/TaskForm/TaskForm'
import TaskInfo from '../../components/TaskInfo/TaskInfo'
import TaskList from '../../components/TaskList/TaskList'
import { useTodos } from '../../hooks/useTodos'
import './TodoListPage.scss'

export const TodoListPage = () => {
    const {
        todos,
        loading,
        error,
        info,
        chosenTodos,
        handleReload,
        handleDelete,
        handleCreate,
        handleUpdate,
        setChosenTodos,
    } = useTodos()

    if (error)
        return (
            <>
                <div>{error}</div>
                <button onClick={handleReload}>Reload</button>
            </>
        )
    if (loading) return <div>Loading...</div>

    return (
        <div className="todo-page">
            <TaskForm create={handleCreate} />
            {info && (
                <TaskInfo activeFilter={chosenTodos} chosenTodos={setChosenTodos} info={info} />
            )}
            {todos.length !== 0 ? (
                <TaskList onUpdate={handleUpdate} taskList={todos} onDelete={handleDelete} />
            ) : (
                <div style={{ marginTop: '30px', fontSize: '22px' }}>Нет задач</div>
            )}
        </div>
    )
}
