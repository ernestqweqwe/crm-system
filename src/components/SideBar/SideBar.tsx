import { Layout } from 'antd'
import { Link } from 'react-router'
import './SideBar.scss'
import { useAppSelector } from 'store/hooks/redux'

export const SideBar = () => {
    const { isAuth } = useAppSelector((state) => state.auth)

    return (
        <Layout.Sider width={300} className="side-bar">
            {isAuth ? <h1>Я авторизован</h1> : <h1>Я не авторизован</h1>}
            <Link to="/">Task List</Link>
            <Link to="/profile">Profile</Link>
        </Layout.Sider>
        // Todo использывать компонент Layout.Slider
    )
}
