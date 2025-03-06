import TaskForm from 'components/TaskForm/TaskForm'
import TaskInfo from 'components/TaskInfo/TaskInfo'
import TaskList from 'components/TaskList/TaskList'
import { useEffect, useState, useCallback } from 'react'
import { Filter, getTodosData } from 'api/todoService'
import { Empty } from 'antd'
import 'pages/TodoListPage/ui/TodoListPage.scss'
import { AllTodosResponse } from 'types/responseTypes'

export const TodoListPage = () => {
    const [data, setData] = useState<AllTodosResponse | null>(null)
    const [activeFilter, setActiveFilter] = useState<string>('all')

    const fetchData = useCallback(async () => {
        const newData = await getTodosData(activeFilter)
        setData((prevData) => {
            return JSON.stringify(prevData) === JSON.stringify(newData) ? prevData : newData
        })
    }, [activeFilter])

    useEffect(() => {
        fetchData()
        const intervalId = setInterval(fetchData, 5000)
        return () => clearInterval(intervalId)
    }, [fetchData])

    return (
        <div className="todo-list__page">
            <TaskForm updateData={fetchData} />
            {data && (
                <>
                    <TaskInfo
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        info={data.info}
                    />

                    {data.data.length !== 0 ? (
                        <TaskList updateData={fetchData} taskList={data.data} />
                    ) : (
                        <Empty description={'You dont have tasks'} />
                    )}
                </>
            )}
        </div>
    )
}
