import { Link } from 'react-router'
import './SideBar.scss'

export const SideBar = () => {
    return (
        <div className="side-bar">
            <Link to="/">Tasks</Link>
            <Link to="/profile">Profile</Link>
        </div>
    )
}
