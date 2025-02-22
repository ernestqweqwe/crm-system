import axios from 'axios'

const BASE_URL = 'https://easydev.club/api/v2'
let accessToken = ''
// let isRefreshing = false;

export const $api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

$api.interceptors.request.use(async (config) => {
    if (!accessToken) {
        accessToken = await getAccessToken()
    }
    config.headers.Authorization = `Bearer ${accessToken}`

    return config
})

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            try {
                accessToken = await getNewAccessToken()
                error.config.headers.Authorization = `Bearer ${accessToken}`
                return $api(error.config)
            } catch (error) {
                console.error('Ошибка обновления токена', error)
            }
        }
        return Promise.reject(error)
    }
)

async function getAccessToken(): Promise<string> {
    try {
        const response = await axios({
            method: 'post',
            url: `${BASE_URL}/auth/signin`,
            data: {
                login: 'aaaassss',
                password: '1236521',
            },
        })
        return response.data.accessToken
    } catch {
        throw Error
    }
}

async function getNewAccessToken(): Promise<string> {
    try {
        const response = await axios({
            method: 'post',
            url: `${BASE_URL}/auth/refresh`,
        })
        return response.data.accessToken
    } catch {
        throw Error
    }
}
