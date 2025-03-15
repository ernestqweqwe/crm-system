import { Filter } from 'api/taskService'
import { FC } from 'react'
import './TaskInfo.scss'
import { Button } from 'antd'
import { Info } from 'types/responseTypes'

interface TaskInfoProps {
    info: Info | null
    activeFilter: Filter
    setActiveFilter: (filter: Filter) => void
}

const labelStatuses: Record<Filter, string> = {
    all: 'Все',
    inWork: 'В работе',
    completed: 'Завершенные',
}

const TaskInfo: FC<TaskInfoProps> = ({ info, activeFilter, setActiveFilter }) => {
    const countOfTasks: Record<Filter, number> = {
        all: info?.all ?? 0,
        inWork: info?.inWork ?? 0,
        completed: info?.completed ?? 0,
    }

    return (
        <div className="tasks-info">
            {Object.entries(countOfTasks).map(([key]) => {
                const filter = key as Filter
                return (
                    <Button
                        disabled={filter === activeFilter}
                        type="primary"
                        size="middle"
                        key={key}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {labelStatuses[filter]} ({countOfTasks[filter]})
                    </Button>
                )
            })}
        </div>
    )
}

export default TaskInfo
