import axios, { InternalAxiosRequestConfig } from 'axios'
import { setAuth } from 'src/store/reducers/slices/sessionSlice/sessionSlice.ts'
import { store } from 'src/store/store'
import { Token } from 'types/authTypes'
import { accessToken } from 'src/api/services/TokenServise.ts'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const $api = axios.create({
    baseURL: BASE_URL,
})

$api.interceptors.request.use((config): InternalAxiosRequestConfig => {
    config.headers.Authorization = `Bearer ${accessToken.getToken()}`
    return config
})

$api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !error.config._isRetry) {
            originalRequest._isRetry = true
            try {
                const response = await axios.post<Token>(
                    `${BASE_URL}auth/refresh`,
                    {
                        refreshToken: localStorage.getItem('refreshToken'),
                    }
                )
                accessToken.setToken(response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)

                return $api.request(originalRequest)
            } catch {
                console.log('Не авторизован')
                store.dispatch(setAuth(false))
                accessToken.resetToken()
                localStorage.clear()
            }
        }
        throw error
    }
)
