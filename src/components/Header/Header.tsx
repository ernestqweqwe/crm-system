import { Header as AntHeader } from 'antd/es/layout/layout'

const Header = () => {
    return (
        <AntHeader
            style={{
                background: 'white',
                border: 'var(--border)',
                borderLeft: 'none',
                height: '64px',
            }}
        ></AntHeader>
    )
}

export default Header
