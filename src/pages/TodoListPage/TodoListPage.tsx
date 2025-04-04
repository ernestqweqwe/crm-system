import TaskInfo from 'src/components/TaskInfo/TaskInfo'
import TaskList from 'src/components/TaskList/TaskList'
import './TodoListPage.scss'
import { Col, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Header } from 'src/pages/TodoListPage/header/Header'

export const TodoListPage = () => {
    return (
        <Layout className="todo-list__page">
            <Header />
            <Content style={{ display: 'flex', justifyContent: 'center' }}>
                <Col className="todo-list__page--content" span={20}>
                    <TaskInfo />
                    <TaskList />
                </Col>
            </Content>
        </Layout>
    )
}
