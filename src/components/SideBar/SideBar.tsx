import { Button, Layout, Menu } from 'antd'
import { Link } from 'react-router'
import './SideBar.scss'
import { useState } from 'react'
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons'

export const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <Layout.Sider
            trigger={null}
            theme="light"
            width={248}
            collapsible
            collapsed={collapsed}
            className="side-bar"
            onCollapse={(value) => setCollapsed(value)}
        >
            <h1 className="logo">Todo App</h1>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: <Link to="/profile">Profile</Link>,
                    },
                    {
                        key: '2',
                        icon: <UnorderedListOutlined />,
                        label: <Link to="/">Task List</Link>,
                    },
                ]}
            />

            <Button className="trigger-btn" onClick={() => setCollapsed((prev) => !prev)}>
                {collapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
            </Button>
        </Layout.Sider>
    )
}
