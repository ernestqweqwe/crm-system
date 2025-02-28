import './TaskInfo.scss'
import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from 'store/hooks/redux'
import { fetchAllTaskData } from 'store/reducers/slices/taskSlice/asyncThunks'
import { setFilter, TabFilters } from 'store/reducers/slices/taskSlice/taskSlice'

const TaskInfo = () => {
    const { data } = useAppSelector((state) => state.task)
    const dispatch = useAppDispatch()
    const handleFilterChange = (filter: TabFilters) => {
        dispatch(setFilter(filter))
        dispatch(fetchAllTaskData(filter))
    }

    return (
        <div className="tasks-info">
            <Button type="primary" size="large" onClick={() => handleFilterChange(TabFilters.ALL)}>
                All ({data.info.all})
            </Button>
            <Button
                type="primary"
                size="large"
                onClick={() => handleFilterChange(TabFilters.COMPLETED)}
            >
                Completed ({data.info.completed})
            </Button>
            <Button
                type="primary"
                size="large"
                onClick={() => handleFilterChange(TabFilters.INWORK)}
            >
                In work ({data.info.inWork})
            </Button>
        </div>
    )
}

export default TaskInfo
