import { Result } from 'antd'
import { Link, useRouteError } from 'react-router'

export const NotFoundPage = () => {
    const error = useRouteError()
    console.error('Route Error:', error)
    return (
        <Result
            style={{ paddingTop: 100 }}
            title={'404'}
            status={'404'}
            subTitle={'404'}
            extra={<Link to={'/'}>Back to home page</Link>}
        ></Result>
    )
}
