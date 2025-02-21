import TaskItem from '../TaskItem/TaskItem.tsx'
import { Todo } from '../../types/Itodo.ts'
import { FC } from 'react'
import './TaskList.scss'

interface ITaskListProps {
    taskList: Todo[]
    onDelete: (taskId: number) => Promise<void>
    onUpdate: (taskId: number, title: string, isDone: boolean) => Promise<void>
}
const TaskList: FC<ITaskListProps> = ({ taskList, onDelete, onUpdate }) => {
    return (
        <div className="task-list">
            {taskList.map((task) => {
                return <TaskItem onUpdate={onUpdate} taskObject={task} onDelete={onDelete} key={task.id} />
            })}
        </div>
    )
}

export default TaskList
