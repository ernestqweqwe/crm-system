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
import { useAppSelector } from 'src/store/hooks/redux.ts'
import { Roles } from 'src/types/usersTypes.ts'

export const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false)
    const roles = useAppSelector((state) => state.user.profile?.roles)

    const items = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: <NavLink to="/profile">Profile</NavLink>,
            requiredRoles: [],
        },
        {
            key: '2',
            icon: <UnorderedListOutlined />,
            label: <NavLink to="/">Task List</NavLink>,
            requiredRoles: [],
        },
        {
            key: '3',
            icon: <UnorderedListOutlined />,
            label: <NavLink to="/users">Users</NavLink>,
            requiredRoles: Roles.ADMIN,
        },
    ]

    const filteredItems = items.filter(
        (item) =>
            item.requiredRoles.length === 0 ||
            roles?.some((role) => item.requiredRoles.includes(role))
    )

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
                items={filteredItems}
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
