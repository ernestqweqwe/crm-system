import TaskForm from '../../components/TaskForm/TaskForm'
import TaskInfo from '../../components/TaskInfo/TaskInfo'
import TaskList from '../../components/TaskList/TaskList'
import { useTodos } from '../../hooks/useTodos'
import './index.scss'

export const TodoListPage = () => {
    const {
        todos,
        loading,
        error,
        handleDelete,
        info,
        handleUpdate,
        setChosenTodos,
        chosenTodos,
    } = useTodos()

    // useEffect(() => {
    //     const interval = setInterval(handleReload, 5000)
    //     return () => clearInterval(interval)
    // }, [handleReload])

    if (error) return <div>Ошибка: {error}</div>

    return (
        <>
            {loading ? (
                <div>Loading</div>
            ) : (
                <div className="todo-list__page">
                    <TaskForm />
                    <TaskInfo activeFilter={chosenTodos} chosenTodos={setChosenTodos} info={info} />
                    {todos.length !== 0 ? (
                        <TaskList
                            onUpdate={handleUpdate}
                            taskList={todos}
                            onDelete={handleDelete}
                        />
                    ) : (
                        <div style={{ marginTop: '30px', fontSize: '22px' }}>Нет задач</div>
                    )}
                </div>
            )}
        </>
    )
}
