import TaskItem from '../TaskItem/TaskItem.tsx'
import { Todo } from '../../types/Itodo.ts'
import './TaskList.scss'
import { FC } from 'react'

interface ITaskListProps {
    taskList: Todo[]
    onDelete: (taskId: number) => Promise<void>
    onUpdate: (taskId: number, title: string, isDone: boolean) => Promise<void>
}
const TaskList: FC<ITaskListProps> = ({ taskList, onDelete, onUpdate }) => {
    console.log(taskList)

    return (
        <div className="task-list">
            {taskList.map((task) => {
                return <TaskItem onUpdate={onUpdate} taskObject={task} onDelete={onDelete} />
            })}
        </div>
    )
}

export default TaskList
