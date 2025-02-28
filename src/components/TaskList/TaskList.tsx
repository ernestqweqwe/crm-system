import TaskItem from '../TaskItem/TaskItem.tsx'
import './TaskList.scss'
import { useAppSelector } from 'store/hooks/redux'

const TaskList = () => {
    const { data } = useAppSelector((state) => state.task)
    return (
        <div className="task-list">
            {data.data.map((task) => {
                return <TaskItem task={task} key={task.id} />
            })}
        </div>
    )
}

export default TaskList
