import { Layout } from 'antd'
import { Link } from 'react-router'
import './SideBar.scss'

export const SideBar = () => {
    return (
        <Layout.Sider width={300} className="side-bar">
            <Link to="/">Task List</Link>
            <Link to="/profile">Profile</Link>
        </Layout.Sider>
        // Todo использывать компонент Layout.Slider
    )
}
