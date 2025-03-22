import { Avatar, Button, Card, Descriptions } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { logout } from 'src/store/reducers/slices/sessionSlice/sessionAsyncThunks.ts'
import { useAppDispatch, useAppSelector } from 'src/store/hooks/redux.ts'
import { getProfile } from 'src/store/reducers/slices/userSlice/userAsyncThunks.ts'
import { useEffect } from 'react'

export const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.user.profile)
    const isAuth = useAppSelector((state) => state.session.isAuth)

    useEffect(() => {
        if (isAuth) {
            dispatch(getProfile())
        }
    }, [isAuth])
    return (
        <Card style={{ width: 600, margin: '30px 0' }} className="profile-page">
            <Avatar icon={<UserOutlined />} size={64} />
            <Descriptions title="User Information">
                <Descriptions.Item label="UserName">
                    {data?.username}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                    {data?.email}
                </Descriptions.Item>
                <Descriptions.Item label="Phone number">
                    {data?.phoneNumber}
                </Descriptions.Item>
            </Descriptions>

            <Button
                onClick={() => {
                    dispatch(logout())
                }}
            >
                logout
            </Button>
        </Card>
    )
}
