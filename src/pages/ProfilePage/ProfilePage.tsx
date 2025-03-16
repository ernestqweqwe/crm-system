import './index.scss'
import { useEffect, useState } from 'react'
import { ProfileRequest } from 'types/authTypes'
import { getUserProfile } from 'api/services/UserService'
import { Button, Descriptions, Layout } from 'antd'
import { useAppDispatch } from 'src/store/hooks/redux'
import { logout } from 'src/store/reducers/slices/authSlice/asyncThunks'

export const ProfilePage = () => {
    const [data, setData] = useState<ProfileRequest | null>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUserProfile()
                setData(response.data)
            } catch {
                console.log('ошибка на самой странице')
            }
        }

        fetchUserData()
    }, [])
    return (
        <Layout className="profile-page">
            <Descriptions style={{ width: 300 }} title="User Info" column={1}>
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

                    localStorage.clear()
                }}
            >
                logout
            </Button>
        </Layout>
    )
}
