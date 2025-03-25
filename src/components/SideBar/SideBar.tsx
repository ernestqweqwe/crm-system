import { Button, Layout, Menu } from 'antd'
import { NavLink } from 'react-router'
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
            breakpoint="md"
            trigger={null}
            theme="light"
            width={240}
            collapsible
            collapsed={collapsed}
            className="side-bar"
            onCollapse={(value) => setCollapsed(value)}
        >
            <h1 className="logo">Todo App</h1>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['2']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: <NavLink to="/profile">Profile</NavLink>,
                    },
                    {
                        key: '2',
                        icon: <UnorderedListOutlined />,
                        label: <NavLink to="/">Task List</NavLink>,
                    },
                    {
                        key: '3',
                        icon: <UnorderedListOutlined />,
                        label: <NavLink to="/users">Users</NavLink>,
                    },
                ]}
            />

            <Button
                className="trigger-btn"
                onClick={() => setCollapsed((prev) => !prev)}
            >
                {collapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
            </Button>
        </Layout.Sider>
    )
}
