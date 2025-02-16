import { useEffect, useState } from 'react'
import TaskForm from '../../components/TaskForm/TaskForm'
import TaskInfo from '../../components/TaskInfo/TaskInfo'
import './TodoListPage.scss'
import { getAllTodos, getToken } from '../../api/todoService'
import { MetaResponce, Todo, TodoInfo } from '../../types/ResponseTypes'
import TaskList from '../../components/TaskList/TaskList'

export const TodoListPage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [token, setToken] = useState<null | string>(localStorage.getItem('token'))
    const [activeTodosFilter, setActiveTodosFilter] = useState('all')
    const [responseData, setResponseData] = useState<MetaResponce<Todo, TodoInfo> | null>()

    function updateTodoList() {
        setLoading(true)
        getAllTodos(activeTodosFilter)
            .then((res) => {
                setResponseData(res)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (!token) {
            setLoading(true)

            getToken()
                .then((res) => {
                    localStorage.setItem('token', res)
                    setToken(res)
                })
                .finally(() => setLoading(false))
        }
    }, [])

    useEffect(() => {
        if (token) updateTodoList()
    }, [activeTodosFilter, token])

    return (
        <div className="todolist-page">
            <div className="todolist-page__container">
                <TaskForm updateTodoList={updateTodoList} />
                {loading && <div style={{ marginTop: '60px', fontSize: '30px' }}>Loading...</div>}
                {responseData && !loading && (
                    <>
                        <TaskInfo
                            activeFilter={activeTodosFilter}
                            setFilter={setActiveTodosFilter}
                            info={responseData.info}
                        />
                        <TaskList updateTodoList={updateTodoList} taskList={responseData.data} />
                    </>
                )}
            </div>
        </div>
    )
}
