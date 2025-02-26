import { $userApi } from '../http'
import { AxiosResponse } from 'axios'
import { ProfileRequest } from '../../types/AuthTypes.ts'

export const getUserProfile = async (): Promise<AxiosResponse<ProfileRequest>> => {
    return await $userApi.get<ProfileRequest>('user/profile')
}
