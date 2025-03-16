import axios, { InternalAxiosRequestConfig } from 'axios'
import {
    setAccessToken,
    setAuth,
} from 'src/store/reducers/slices/authSlice/authSlice'
import { store } from 'src/store/store'
import { Token } from 'types/authTypes'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const $api = axios.create({
    baseURL: BASE_URL,
})

$api.interceptors.request.use((config): InternalAxiosRequestConfig => {
    config.headers.Authorization = `Bearer ${store.getState().auth.accessToken}`
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
                store.dispatch(setAccessToken(response.data.accessToken))
                localStorage.setItem('refreshToken', response.data.refreshToken)

                return $api.request(originalRequest)
            } catch {
                console.log('Не авторизован')
                store.dispatch(setAuth(false))
                store.dispatch(setAccessToken(''))
                localStorage.clear()
            }
        }
        throw error
    }
)
