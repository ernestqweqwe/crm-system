import { $api } from 'api/http/index'
import { AxiosResponse } from 'axios'
import { ProfileRequest } from 'types/authTypes'

export const getUserProfile = async (): Promise<AxiosResponse<ProfileRequest>> => {
    return await $api.get<ProfileRequest>('user/profile')
}
