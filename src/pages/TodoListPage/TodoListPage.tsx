import { useEffect, useState } from 'react'
import TaskForm from '../../components/TaskForm/TaskForm'
import { getTodosData } from '../../api/services/TodoService.ts'
import TaskInfo from '../../components/TaskInfo/TaskInfo.tsx'
import { Empty } from 'antd'
import TaskList from '../../components/TaskList/TaskList.tsx'
import './TodoListPage.scss'
import { AllTodosResponse } from '../../types/responseTypes.ts'

export const TodoListPage = () => {
    const [data, setData] = useState<AllTodosResponse | null>(null)
    const [activeFilter, setActiveFilter] = useState<string>('all')

    const fetchData = async () => {
        await getTodosData(activeFilter).then((res) => setData(res.data))
    }

    useEffect(() => {
        fetchData()
    }, [activeFilter])

    useEffect(() => {
        const intervalId = setInterval(fetchData, 5000)
        return () => clearInterval(intervalId)
    }, [activeFilter])

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
