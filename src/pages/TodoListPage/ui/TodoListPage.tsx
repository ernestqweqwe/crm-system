import TaskForm from 'components/TaskForm/TaskForm'
import TaskInfo from 'components/TaskInfo/TaskInfo'
import TaskList from 'components/TaskList/TaskList'
import { useEffect, useState, useCallback } from 'react'
import { Filter, getTodosData } from 'api/taskService'
import { Col, Empty, Layout } from 'antd'
import 'pages/TodoListPage/ui/TodoListPage.scss'
import { Data, Info } from 'types/responseTypes'

export const TodoListPage = () => {
    const [tasksData, setTasksData] = useState<Data[] | null>(null)
    const [tasksInfo, setTaskInfo] = useState<Info | null>(null)
    const [activeFilter, setActiveFilter] = useState<Filter>('all')

    const fetchData = useCallback(async () => {
        try {
            const newData = await getTodosData(activeFilter)
            setTasksData((prevData) => {
                if (JSON.stringify(prevData) === JSON.stringify(newData.data)) {
                    return prevData
                }

                return newData.data
            })

            setTaskInfo((prevData) => {
                if (JSON.stringify(prevData) === JSON.stringify(newData.info)) {
                    return prevData
                }

                return newData.info
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
                {tasksData && (
                    <>
                        <TaskInfo
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                            info={tasksInfo}
                        />

                        {tasksData.length !== 0 ? (
                            <TaskList updateData={fetchData} taskList={tasksData} />
                        ) : (
                            <Empty description={'You dont have tasks'} />
                        )}
                    </>
                )}
            </Col>
        </Layout>
    )
}
