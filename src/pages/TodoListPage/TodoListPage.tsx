import { useEffect, useState } from 'react'
import TaskForm from '../../components/TaskForm/TaskForm'
import TaskInfo from '../../components/TaskInfo/TaskInfo'
import './TodoListPage.scss'
import { getAllTodos } from '../../api/todoService'
import { MetaResponce, Todo, TodoInfo } from '../../types/ResponseTypes'
import TaskList from '../../components/TaskList/TaskList'

export const TodoListPage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [activeTodosFilter, setActiveTodosFilter] = useState('all')
    const [responseData, setResponseData] = useState<MetaResponce<Todo, TodoInfo> | null>()

    function updateTodoList() {
        setLoading(true)
        getAllTodos(activeTodosFilter)
            .then(setResponseData)
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getAllTodos(activeTodosFilter)
    }, [])

    useEffect(() => {
        updateTodoList()
    }, [activeTodosFilter])

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
                        {responseData.data.length !== 0 ? (
                            <TaskList
                                updateTodoList={updateTodoList}
                                taskList={responseData.data}
                            />
                        ) : (
                            <h1 style={{ marginTop: 30 }}>No tasks</h1>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
