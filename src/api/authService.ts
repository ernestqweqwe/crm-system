import axios from 'axios'

const BASE_URL = 'https://easydev.club/api/v1'
// let accessToken = null;
// let isRefreshing = false;

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials:true
})

export async function getAccessToken() {
    const response = await axios.get(`${BASE_URL}/auth/signin`,{
        method:'POST',
        data:{
            login: 'aaaassss',
            password: '1236521',
        }
    })

    return response.data
}

// api.interceptors.request.use((config) => {
//
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//
//     return config
// })
