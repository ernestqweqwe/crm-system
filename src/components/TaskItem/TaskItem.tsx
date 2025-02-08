import { Todo } from '../../types/Itodo'
import './taskItem.scss'

interface ItaskItmeProps {
    taskObject: Todo
    onDelete: (taskId: number) => Promise<void>
}

const TaskItem = ({ taskObject, onDelete }: ItaskItmeProps) => {
    const { isDone, title, id } = taskObject
    return (
        <div className="task-item">
            <input
                onChange={() => {}}
                type="checkbox"
                id="task-check"
                checked={isDone}
            />
            <label htmlFor="task-check">{title}</label>
            <div className="task-item__btns">
                <button className="btn">Change</button>
                <button
                    className="btn"
                    onClick={() => id !== undefined && onDelete(id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TaskItem
