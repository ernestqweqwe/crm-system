import { ProfilePage } from 'pages/ProfilePage/index'
import { TodoListPage } from 'pages/TodoListPage/index'
import { Route, Routes } from 'react-router'
import { SideBar } from '../SideBar/SideBar'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'

export const PageRouter = () => {
    return (
        <Layout className="page">
            <SideBar />
            <Layout>
                <Content>
                    <Routes>
                        <Route path="/" element={<TodoListPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    )
}
