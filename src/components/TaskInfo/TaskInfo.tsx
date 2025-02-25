import { FC } from 'react'
import './TaskInfo.scss'
import { TodoInfo } from '../../types/ResponseTypes'

interface TaskInfoProps {
    activeFilter: string
    setFilter: (filter: string) => void
    info: TodoInfo
}

const TaskInfo: FC<TaskInfoProps> = ({ activeFilter, setFilter, info }) => {
    return (
        <div className="tasks-info">
            <div
                onClick={() => setFilter('all')}
                className={`tasks-info__item ${activeFilter === 'all' ? 'active' : ''}`}
            >
                All ({info.all})
            </div>
            <div
                onClick={() => setFilter('completed')}
                className={`tasks-info__item ${activeFilter === 'completed' ? 'active' : ''}`}
            >
                Completed ({info.completed})
            </div>
            <div
                onClick={() => setFilter('inWork')}
                className={`tasks-info__item ${activeFilter === 'inWork' ? 'active' : ''}`}
            >
                In work ({info.inWork})
            </div>
        </div>
    )
}

export default TaskInfo
