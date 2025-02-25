import { Link } from 'react-router'
import './SideBar.scss'

export const SideBar = () => {
    return (
        <div className="side-bar">
            <Link to="/">Task List</Link>
            <Link to="/profile">Profile</Link>
        </div>
        // Todo использывать компонент Layout.Slider
    )
}
