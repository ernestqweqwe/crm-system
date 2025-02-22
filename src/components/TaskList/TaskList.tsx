import TaskItem from '../TaskItem/TaskItem.tsx'
import { Todo } from '../../types/Itodo.ts'
import { FC } from 'react'
import './TaskList.scss'

interface ITaskListProps {
    taskList: Todo[]
    updateData:()=>void
    setError:(error:Error)=>void
}
const TaskList: FC<ITaskListProps> = ({ taskList, updateData,setError}) => {



    return (
        <div className="task-list">
            {taskList.map((task) => {
                return (
                    <TaskItem
                        setError={setError}
                        updateData={updateData}
                        taskObject={task}
                        key={task.id}
                    />
                )
            })}
        </div>
    )
}

export default TaskList
