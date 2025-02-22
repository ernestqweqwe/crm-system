import axios from 'axios'

const BASE_URL = 'https://easydev.club/api/v2'
let accessToken = '';
// let isRefreshing = false;

export const api = axios.create({
    baseURL: BASE_URL,
})

api.interceptors.request.use(async (config) => {

    if (!accessToken) {
      accessToken =  await getAccessToken()
    }
    config.headers.Authorization = `Bearer ${accessToken}`

    return config
})


async function getAccessToken() {
    try {
        const response = await axios({
            method:'post',
            url:`${BASE_URL}/auth/signin`,
            data:{
                login: 'aaaassss',
                password: '1236521',
            }
        })
        return response.data.accessToken
    } catch  {
        throw Error
    }
}

