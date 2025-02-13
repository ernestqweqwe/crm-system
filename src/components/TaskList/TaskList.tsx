import { Todo } from '../../types/ResponseTypes.ts'
import TaskItem from '../TaskItem/TaskItem.tsx'
import './TaskList.scss'
import { FC } from 'react'

interface ITaskListProps {
    taskList: Todo[]
    onDelete: (taskId: number) => Promise<void>
    onUpdate: (taskId: number, title: string, isDone: boolean) => Promise<void>
}
const TaskList: FC<ITaskListProps> = ({ taskList, onDelete, onUpdate }) => {
    return (
        <div className="task-list">
            {taskList.map((task) => {
                return (
                    <TaskItem
                        onUpdate={onUpdate}
                        taskObject={task}
                        onDelete={onDelete}
                        key={task.id}
                    />
                )
            })}
        </div>
    )
}

export default TaskList
