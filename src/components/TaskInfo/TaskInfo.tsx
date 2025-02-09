import { FC } from 'react'
import { Info } from '../../hooks/useTodos.ts'
import './TaskInfo.scss'

interface TaskInfoProps {
    info: Info
    chosenTodos: (chosenTemplate: string) => void
    activeFilter: string
}

const TaskInfo: FC<TaskInfoProps> = ({ info, chosenTodos, activeFilter }) => {
    const { all, completed, inWork } = info
    return (
        <div className="tasks-info">
            <div
                onClick={() => chosenTodos('all')}
                className={`tasks-info__item ${activeFilter === 'all' ? 'active' : ''}`}
            >
                All ({all})
            </div>
            <div
                onClick={() => chosenTodos('completed')}
                className={`tasks-info__item ${activeFilter === 'completed' ? 'active' : ''}`}
            >
                Completed ({completed})
            </div>
            <div
                onClick={() => chosenTodos('inWork')}
                className={`tasks-info__item ${activeFilter === 'inWork' ? 'active' : ''}`}
            >
                In work ({inWork})
            </div>
        </div>
    )
}

export default TaskInfo
