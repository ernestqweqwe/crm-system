import { Todo } from '../../types/ResponseTypes.ts'
import TaskItem from '../TaskItem/TaskItem.tsx'
import './TaskList.scss'
import { FC } from 'react'

interface ITaskListProps {
    taskList: Todo[]
    updateTodoList: () => void
}
const TaskList: FC<ITaskListProps> = ({ taskList, updateTodoList }) => {
    return (
        <div className="task-list">
            <div className="task-list__container">
                {taskList.map((task) => {
                    return (
                        <TaskItem updateTodoList={updateTodoList} taskObject={task} key={task.id} />
                    )
                })}
            </div>
        </div>
    )
}

export default TaskList
