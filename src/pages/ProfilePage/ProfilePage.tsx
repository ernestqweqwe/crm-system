import './index.scss'
import { useEffect, useState } from 'react'
import { ProfileRequest } from 'types/authTypes'
import { getUserProfile } from 'api/services/UserService'
import { Descriptions, Layout } from 'antd'

export const ProfilePage = () => {
    const [data, setData] = useState<ProfileRequest | null>(null)

    useEffect(() => {
        try {
            getUserProfile().then((res) => setData(res.data))
        } catch {
            console.log('ошибка на самой странице')
        }
    }, [])
    return (
        <Layout className="profile-page">
            <Descriptions style={{ width: 300 }} title="User Info" column={1}>
                <Descriptions.Item label="UserName">{data?.username}</Descriptions.Item>
                <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
                <Descriptions.Item label="Phone number">{data?.phoneNumber}</Descriptions.Item>
            </Descriptions>
        </Layout>
    )
}
