import './TaskInfo.scss'
import { Radio, RadioChangeEvent } from 'antd'
import { useAppDispatch, useAppSelector } from 'src/store/hooks/redux.ts'
import { todoApi } from 'src/store/services/taskListService.ts'
import {
    setFilter,
    TabFilters,
} from 'src/store/reducers/slices/taskListSlice/taskListSlice.ts'

export type Filter = 'all' | 'inWork' | 'completed'

const labelStatuses: Record<Filter, string> = {
    all: 'Все',
    inWork: 'В работе',
    completed: 'Завершенные',
}

const TaskInfo = () => {
    const dispatch = useAppDispatch()
    const { tabFilter } = useAppSelector((state) => state.taskList)

    const { info } = todoApi.useGetAllTodosQuery(tabFilter, {
        selectFromResult: ({ data }) => ({ info: data?.info }),
    })

    const handleFilterChange = (e: RadioChangeEvent) => {
        dispatch(setFilter(e.target.value as TabFilters))
    }

    const countOfTasks: Record<Filter, number> = {
        all: info?.all ?? 0,
        inWork: info?.inWork ?? 0,
        completed: info?.completed ?? 0,
    }

    return (
        <div className="tasks-info">
            <Radio.Group defaultValue={'all'} onChange={handleFilterChange}>
                {Object.entries(countOfTasks).map(([key]) => {
                    const filter = key as Filter
                    return (
                        <Radio.Button type="primary" value={key} key={key}>
                            {labelStatuses[filter]} ({countOfTasks[filter]})
                        </Radio.Button>
                    )
                })}
            </Radio.Group>
        </div>
    )
}

export default TaskInfo
