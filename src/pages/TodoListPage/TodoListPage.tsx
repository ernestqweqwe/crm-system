import { useEffect } from 'react'
import TaskForm from '../../components/TaskForm/TaskForm'
import TaskInfo from '../../components/TaskInfo/TaskInfo.tsx'
import './TodoListPage.scss'
import { useAppDispatch, useAppSelector } from 'store/hooks/redux'
import { fetchAllTaskData } from 'store/reducers/slices/taskSlice/asyncThunks'
import { TabFilters } from 'store/reducers/slices/taskSlice/taskSlice'
import TaskList from '../../components/TaskList/TaskList.tsx'
import { Empty } from 'antd'

export const TodoListPage = () => {
    const dispatch = useAppDispatch()
    const { data, isLoading } = useAppSelector((state) => state.task)

    useEffect(() => {
        dispatch(fetchAllTaskData(TabFilters.ALL))
    }, [])
    return (
        <div className="todo-list__page">
            <TaskForm />
            <TaskInfo />

            {!isLoading && (
                <>
                    {data.data.length !== 0 ? (
                        <TaskList />
                    ) : (
                        <Empty description={'You dont have tasks'} />
                    )}
                </>
            )}
        </div>
    )
}
