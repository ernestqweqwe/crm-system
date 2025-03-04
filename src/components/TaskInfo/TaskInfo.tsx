import './TaskInfo.scss'
import { Radio, RadioChangeEvent } from 'antd'
import { todoApi } from 'store/services/todosService'
import { useAppDispatch, useAppSelector } from 'store/hooks/redux'
import { setFilter, TabFilters } from 'store/reducers/slices/taskSlice/taskSlice'

const TaskInfo = () => {
    const dispatch = useAppDispatch()
    const { tabFilter } = useAppSelector((state) => state.task)

    const { info } = todoApi.useGetAllTodosQuery(tabFilter, {
        selectFromResult: ({ data }) => ({ info: data?.info }),
    })

    const handleFilterChange = (e: RadioChangeEvent) => {
        dispatch(setFilter(e.target.value as TabFilters))
    }

    return (
        <div className="tasks-info">
            {info && (
                <Radio.Group size="middle" value={tabFilter} onChange={handleFilterChange}>
                    <Radio.Button value="all">All ({info.all})</Radio.Button>
                    <Radio.Button value="inWork">In Work ({info.inWork})</Radio.Button>
                    <Radio.Button value="completed">Completed ({info.completed})</Radio.Button>
                </Radio.Group>
            )}
        </div>
    )
}

export default TaskInfo
