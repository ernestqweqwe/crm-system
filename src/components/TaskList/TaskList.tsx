import { taskListService } from 'src/store/services/taskListService.ts'
import { useAppSelector } from 'store/hooks/redux'
import TaskItem from '../TaskItem/TaskItem.tsx'
import './TaskList.scss'
import { Empty } from 'antd'

const TaskList = () => {
    const { tabFilter } = useAppSelector((state) => state.taskList)

    const { tasks } = taskListService.useGetAllTodosQuery(tabFilter, {
        pollingInterval: 5000,
        selectFromResult: ({ data }) => ({ tasks: data?.data }),
    })

    return (
        <div className="task-list">
            {tasks &&
                tasks.map((task) => {
                    return <TaskItem task={task} key={task.id} />
                })}

            {tasks?.length === 0 && (
                <Empty description="Please add some tasks" />
            )}
        </div>
    )
}

export default TaskList
