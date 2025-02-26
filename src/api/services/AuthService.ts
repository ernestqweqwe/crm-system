import { AuthData, Token, UserRegistration } from '../../types/AuthTypes.ts'
import { AxiosResponse } from 'axios'
import { $authApi } from '../http'

export const userRegistration = async (props: UserRegistration): Promise<void> => {
    const { email, login, password, phoneNumber, username } = props
    await $authApi.post('/signup', {
        email,
        login,
        password,
        phoneNumber,
        username,
    })
}

export const userLogin = async (props: AuthData): Promise<void> => {
    const { password, login } = props
    const response: AxiosResponse<Token> = await $authApi.post('/signin', {
        password,
        login,
    })
    const { refreshToken, accessToken } = response.data
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('accessToken', accessToken)
}

export const refreshToken = async (): Promise<void> => {
    const tokens: Token = JSON.parse(<string>localStorage.getItem('token'))
    const refreshToken = tokens.refreshToken
    await $authApi
        .post('/refresh', {
            refreshToken: refreshToken,
        })
        .then((res) => localStorage.setItem('token', res.data))
}

// TODO подобавлять заголовки, чекнуть в свагере

//TODO интерцепторы на 401
