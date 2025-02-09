import { FC } from 'react'
import { Info } from '../../hooks/useTodos.ts'
import './TaskInfo.scss'

interface TaskInfoProps {
    info: Info
}

const TaskInfo: FC<TaskInfoProps> = ({ info }) => {
    const { all, completed, inWork } = info
    return (
        <div className="tasks-info">
            <div className="tasks-info__item">All:({all})</div>
            <div className="tasks-info__item">completed:({completed})</div>
            <div className="tasks-info__item">inWork:({inWork})</div>
        </div>
    )
}

export default TaskInfo
