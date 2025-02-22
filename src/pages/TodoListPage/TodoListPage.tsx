import { useCallback, useEffect, useState } from 'react'
import TaskForm from '../../components/TaskForm/TaskForm'
import { getTodosData } from '../../api/todoService.ts'
import TaskInfo from '../../components/TaskInfo/TaskInfo.tsx'
import { Empty, notification, Spin } from 'antd'
import TaskList from '../../components/TaskList/TaskList.tsx'
import './TodoListPage.scss'
import { LoadingOutlined } from '@ant-design/icons'
import { AllTodosResponse } from '../../types/responseTypes.ts'

export const TodoListPage = () => {
    const [data, setData] = useState<AllTodosResponse | null>(null)
    const [activeFilter, setActiveFilter] = useState<string>('all')
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification()

    const fetchData = useCallback(async () => {
        try {
            const todos = await getTodosData(activeFilter)
            setData(todos)
            setError(null)
        } catch (err) {
            setError(err as Error)
        }
    }, [activeFilter])

    const openNotification = () => {
        api.error({
            message: 'Something went wrong',
            description: error?.message,
            duration: 7,
            onClose: () => setError(null),
        })
    }

    useEffect(() => {
        if (error) {
            openNotification()
        }
    }, [error])

    useEffect(() => {
        setLoading(true)
        fetchData().finally(() => setLoading(false))
    }, [activeFilter])

    useEffect(() => {
        const intervalId = setInterval(fetchData, 5000)
        return () => clearInterval(intervalId)
    }, [fetchData])

    return (
        <div className="todo-list__page">
            <TaskForm setError={setError} updateData={fetchData} />
            {!loading && data ? (
                <>
                    <TaskInfo
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        info={data.info}
                    />

                    {data.data.length !== 0 ? (
                        <TaskList updateData={fetchData} taskList={data.data} setError={setError} />
                    ) : (
                        <Empty description={'You dont have tasks'} />
                    )}
                </>
            ) : (
                <Spin
                    style={{ marginTop: 100 }}
                    indicator={<LoadingOutlined spin />}
                    size={'large'}
                />
            )}
            {contextHolder}
        </div>
    )
}
