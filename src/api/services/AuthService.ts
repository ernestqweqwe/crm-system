import { $api } from 'src/api/http'
import axios, { AxiosResponse } from 'axios'
import { AuthData, Token, UserRegistration } from 'types/authTypes'

class AuthService {
    static registration = async (props: UserRegistration): Promise<void> => {
        const { email, login, password, phoneNumber, username } = props
        await $api.post('auth/signup', {
            email,
            login,
            password,
            phoneNumber,
            username,
        })
    }

    static login = async (props: AuthData): Promise<Token> => {
        const { password, login } = props
        const response: AxiosResponse<Token> = await $api.post('auth/signin', {
            password,
            login,
        })
        return response.data
    }

    static logout = async (): Promise<void> => {
        return await axios.post('https://easydev.club/api/v1/user/logout')
    }
}

export default AuthService
