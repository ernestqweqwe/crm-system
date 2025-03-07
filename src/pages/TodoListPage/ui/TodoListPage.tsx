import TaskForm from 'components/TaskForm/TaskForm'
import TaskInfo from 'components/TaskInfo/TaskInfo'
import TaskList from 'components/TaskList/TaskList'
import { useEffect, useState, useCallback } from 'react'
import { Filter, getTodosData } from 'api/taskService'
import { Col, Empty, Layout } from 'antd'
import 'pages/TodoListPage/ui/TodoListPage.scss'
import { AllTodosResponse } from 'types/responseTypes'

export const TodoListPage = () => {
    const [data, setData] = useState<AllTodosResponse | null>(null)
    const [activeFilter, setActiveFilter] = useState<Filter>('all')

    const fetchData = useCallback(async () => {
        try {
            const newData = await getTodosData(activeFilter)
            setData((prevData) => {
                return JSON.stringify(prevData) === JSON.stringify(newData) ? prevData : newData
            })
        } catch (e) {
            console.log(e)
        }
    }, [activeFilter])

    useEffect(() => {
        fetchData()
        const intervalId = setInterval(fetchData, 5000)
        return () => clearInterval(intervalId)
    }, [fetchData])

    return (
        <Layout className="todo-list__page">
            <Col style={{ padding: 15, width: '70%' }}>
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
            </Col>
        </Layout>
    )
}
