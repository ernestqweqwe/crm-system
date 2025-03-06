import TaskItem from 'components/TaskItem/TaskItem'
import { FC } from 'react'
import './TaskList.scss'
import { Todo } from 'types/Itodo'

interface ITaskListProps {
    taskList: Todo[]
    updateData: () => void
}
const TaskList: FC<ITaskListProps> = ({ taskList, updateData }) => {
    return (
        <div className="task-list">
            {taskList.map((task) => {
                return <TaskItem updateData={updateData} taskObject={task} key={task.id} />
            })}
        </div>
    )
}

export default TaskList
