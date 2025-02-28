import './index.scss'
import { useEffect, useState } from 'react'
import { ProfileRequest } from 'types/authTypes'
import { getUserProfile } from 'api/services/UserService'

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
        <div className="profile-page">
            <h1>Привет пользователь</h1>
            <div>
                {data && (
                    <>
                        <div>Email: {data.email}</div>
                        <div>User name: {data.username}</div>
                        <div>Phone: {data.phoneNumber}</div>
                    </>
                )}
            </div>
        </div>
    )
}
