import { Todo } from '../../types/Itodo'
import './TaskItem.scss'
import MyButton from '../UI/MyButton/MyButton.tsx'

interface ITaskItemProps {
    taskObject: Todo
    onDelete: (taskId: number) => Promise<void>
}

const TaskItem = ({ taskObject, onDelete }: ITaskItemProps) => {
    const { isDone, title, id } = taskObject
    return (
        <div className="task-item">
            <input onChange={() => {}} type="checkbox" id="task-check" checked={!isDone} />
            <label htmlFor="task-item__check">{title}</label>
            <div className="task-item__btns">
                <MyButton className="btn btn__green" />
                <MyButton
                    className="btn btn__red"
                    onClick={() => id !== undefined && onDelete(id)}
                />
            </div>
        </div>
    )
}

export default TaskItem
