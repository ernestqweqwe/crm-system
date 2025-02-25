import axios from 'axios'
import { AuthData, Token, UserRegistration } from '../types/AuthTypes.ts'

const auth = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

export const userRegistration = async (props: UserRegistration) => {
    const { email, login, password, phoneNumber, username } = props
    const response = await auth.post('/auth/signup', {
        email,
        login,
        password,
        phoneNumber,
        username,
    })

    return response
}

export const userLogin = async (props: AuthData): Promise<Token> => {
    const { password, login } = props
    const response = await auth.post('/auth/signin', {
        password,
        login,
    })
    return response.data
}

export const getUserProfile = async () => {
    const tokens: Token = JSON.parse(<string>localStorage.getItem('token'))
    const { accessToken } = tokens

    const responce = await auth.get('user/profile', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    return responce
}

export const getNewToken = async () => {
    const tokens: Token = JSON.parse(<string>localStorage.getItem('token'))
    const refreshToken = tokens.refreshToken
    console.log(refreshToken)

    await auth
        .post('auth/refresh', {
            refreshToken: refreshToken,
        })
        .then((res) => localStorage.setItem('token', res.data))
}

// Todo все запрсы которые начинаються с auth( 3 штуки) оставить в этом файле файле, остальные которые начинаються на user в отдельный файл
// TODO подобавлять заголовки, чекнуть в свагере

//TODO интерцепторы на 401
