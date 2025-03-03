import TaskForm from '../../components/TaskForm/TaskForm'
import TaskInfo from '../../components/TaskInfo/TaskInfo.tsx'
import './TodoListPage.scss'
import TaskList from '../../components/TaskList/TaskList.tsx'

export const TodoListPage = () => {
    return (
        <div className="todo-list__page">
            <TaskForm />
            <TaskInfo />
            <TaskList />
        </div>
    )
}
