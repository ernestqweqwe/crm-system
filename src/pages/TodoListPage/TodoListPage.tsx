import TaskInfo from 'src/components/TaskInfo/TaskInfo'
import TaskList from 'src/components/TaskList/TaskList'
import './TodoListPage.scss'
import { Col } from 'antd'

export const TodoListPage = () => {
    return (
        <>
            <Col className="todo-list__page--content" span={20}>
                <TaskInfo />
                <TaskList />
            </Col>
        </>
    )
}
