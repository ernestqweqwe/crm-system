import { NotFoundPage } from 'pages/NotFoundPage/index'
import { Suspense } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router'
import { SideBar } from 'src/components/SideBar/SideBar.tsx'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { TodoListPage } from 'src/pages/TodoListPage'
import { ProfilePage } from 'src/pages/ProfilePage'

function App() {
    return (
        <Suspense fallback="">
            <Routes>
                <Route
                    path="/*"
                    element={
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
                    }
                />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}

export default App
