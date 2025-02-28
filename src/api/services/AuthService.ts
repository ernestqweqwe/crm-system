import { $authApi } from 'api/http/index'
import { AxiosResponse } from 'axios'
import { AuthData, Token, UserRegistration } from 'types/authTypes'

class AuthService {
    static registration = async (props: UserRegistration): Promise<void> => {
        const { email, login, password, phoneNumber, username } = props
        await $authApi.post('/signup', {
            email,
            login,
            password,
            phoneNumber,
            username,
        })
    }

    static login = async (props: AuthData): Promise<Token> => {
        const { password, login } = props
        const response: AxiosResponse<Token> = await $authApi.post('/signin', {
            password,
            login,
        })
        return response.data
    }

    static refreshToken = async (): Promise<void> => {
        const tokens: Token = JSON.parse(<string>localStorage.getItem('token'))
        const refreshToken = tokens.refreshToken
        await $authApi
            .post('/refresh', {
                refreshToken: refreshToken,
            })
            .then((res) => localStorage.setItem('token', res.data))
    }
}

export default AuthService

// TODO подобавлять заголовки, чекнуть в свагере

//TODO интерцепторы на 401
