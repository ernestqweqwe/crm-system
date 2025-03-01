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
