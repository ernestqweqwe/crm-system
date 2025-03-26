import { AxiosResponse } from 'axios'
import { ProfileRequest } from 'types/authTypes'
import { $api } from 'src/api/http'

class UserService {
    static getProfile = async (): Promise<AxiosResponse<ProfileRequest>> => {
        return await $api<ProfileRequest>('user/profile')
    }
}

export default UserService
