import { Outlet } from 'react-router'
import { SideBar } from '../SideBar/SideBar'
import { Layout } from 'antd'
import Header from 'src/components/Header/Header.tsx'
import { Content } from 'antd/es/layout/layout'

export const RootRouter = () => {
    return (
        <Layout className="page" style={{ height: '100vh' }}>
            <SideBar />
            <Layout>
                <Header />
                <Content style={{ display: 'flex', justifyContent: 'center' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
