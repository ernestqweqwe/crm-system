import TaskItem from '../TaskItem/TaskItem.tsx'
import { Todo } from '../../types/Itodo.ts'
import './TaskList.scss'

interface ItaskListProps {
    taskList: Todo[]
    onDelete: (taskId: number) => Promise<void>
}
function TaskList({ taskList, onDelete }: ItaskListProps) {
    console.log(taskList)
    return (
        <div className="task-list">
            {taskList.map((task) => {
                return <TaskItem taskObject={task} onDelete={onDelete} />
            })}
        </div>
    )
}

export default TaskList
