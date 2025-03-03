import './TaskInfo.scss'
import { Button } from 'antd'
import { todoApi } from 'store/services/todosService'
import { useAppDispatch, useAppSelector } from 'store/hooks/redux'
import { setFilter, TabFilters } from 'store/reducers/slices/taskSlice/taskSlice'

const TaskInfo = () => {
    const { tabFilter } = useAppSelector((state) => state.task)
    const { info } = todoApi.useGetAllTodosQuery(tabFilter, {
        selectFromResult: ({ data }) => ({ info: data?.info }),
    })
    const dispatch = useAppDispatch()
    const handleFilterChange = (filter: TabFilters) => {
        dispatch(setFilter(filter))
    }

    return (
        <div className="tasks-info">
            {info && (
                <>
                    <Button type="primary" size="large" onClick={() => handleFilterChange('all')}>
                        All ({info.all})
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => handleFilterChange('completed')}
                    >
                        Completed ({info.completed})
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => handleFilterChange('inWork')}
                    >
                        In work ({info.inWork})
                    </Button>
                </>
            )}
        </div>
    )
}

export default TaskInfo
