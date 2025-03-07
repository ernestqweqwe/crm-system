import { Result } from 'antd'
import { Link } from 'react-router'

export const NotFoundPage = () => {
    return (
        <Result
            style={{ paddingTop: 100 }}
            title={'404'}
            status={'404'}
            subTitle={'Sorry, page doesnt exist'}
            extra={<Link to={'/'}>Back to home page</Link>}
        />
    )
}
