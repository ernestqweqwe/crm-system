import axios, { InternalAxiosRequestConfig } from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const $userApi = axios.create({
    baseURL: BASE_URL,
})

$userApi.interceptors.request.use((config): InternalAxiosRequestConfig => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
})

export const $authApi = axios.create({
    baseURL: `${BASE_URL}/auth`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export const $todoApi = axios.create({
    baseURL: BASE_URL,
})
