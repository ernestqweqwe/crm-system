import { useEffect, useState } from 'react'
import TaskForm from '../../components/TaskForm/TaskForm'
import TaskInfo from '../../components/TaskInfo/TaskInfo'
import './TodoListPage.scss'
import { getAllTodos, getToken, updateTodo } from '../../api/todoService'
import { MetaResponce, Todo, TodoInfo } from '../../types/ResponseTypes'
import TaskList from '../../components/TaskList/TaskList'

export const TodoListPage = () => {
    const [error, setError] = useState(null)
    const [activeTodosFilter, setActiveTodosFilter] = useState('all')
    const [responseData, setResponseData] = useState<MetaResponce<Todo, TodoInfo> | null>()

    function updateTodoList() {
        const token = localStorage.getItem('token')
        if (!token) return

        getAllTodos(activeTodosFilter).then((res) => {
            setResponseData(res)
        })
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            getToken()
                .then((res) => localStorage.setItem('token', res))
                .catch((err) => setError(err.message))
        }
    }, [])

    useEffect(() => {
        updateTodoList()
    }, [activeTodosFilter])

    if (error)
        return (
            <>
                <div>{error}</div>
                {/* <button onClick={handleReload}>Reload</button> */}
            </>
        )

    return (
        <div className="todo-page">
            {responseData && (
                <>
                    <TaskForm updateTodoList={updateTodoList} />
                    <TaskInfo
                        activeFilter={activeTodosFilter}
                        setFilter={setActiveTodosFilter}
                        info={responseData?.info}
                    />
                    <TaskList taskList={responseData?.data} />
                </>
            )}
        </div>
    )
}
