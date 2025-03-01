import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from 'api/services/AuthService'
import { AxiosError } from 'axios'
import { AuthData } from 'types/authTypes'

export const fetchLogin = createAsyncThunk(
    'auth/login',
    async (props: AuthData, { rejectWithValue }) => {
        try {
            const response = await authService.login(props)
            localStorage.setItem('accessToken', response.accessToken)
            localStorage.setItem('refreshToken', response.refreshToken)
        } catch (err) {
            if (err instanceof AxiosError) return rejectWithValue(err.status)
            console.log(err, 'Неизвестная ошибка')
            rejectWithValue(500)
        }
    }
)

export const checkIsAuth = createAsyncThunk('auth/isAuth', async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
        return rejectWithValue('Нет токена')
    }

    try {
        const response = await authService.refreshToken(refreshToken)
        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
    } catch {
        return rejectWithValue('Токен не валидный')
    }
})
