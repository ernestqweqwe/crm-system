import { FC } from 'react'
import { Info } from '../../hooks/useTodos.ts'
import './TaskInfo.scss'

interface TaskInfoProps {
    info: Info
    chosenTodos: (choosenTemplate: string) => void
}

const TaskInfo: FC<TaskInfoProps> = ({ info, chosenTodos }) => {
    const { all, completed, inWork } = info
    return (
        <div className="tasks-info">
            <div onClick={() => chosenTodos('all')} className="tasks-info__item">
                All:({all})
            </div>
            <div onClick={() => chosenTodos('completed')} className="tasks-info__item">
                Completed:({completed})
            </div>
            <div onClick={() => chosenTodos('inWork')} className="tasks-info__item">
                In work:({inWork})
            </div>
        </div>
    )
}

export default TaskInfo
