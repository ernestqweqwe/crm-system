import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from 'api/services/AuthService'
import axios, { AxiosError } from 'axios'
import { AuthData, Token } from 'types/authTypes'
import { accessToken } from 'src/api/services/TokenServise.ts'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const login = createAsyncThunk(
    'auth/login',
    async (props: AuthData, { rejectWithValue }) => {
        try {
            const response = await authService.login(props)
            accessToken.setToken(response.accessToken)
            localStorage.setItem('refreshToken', response.refreshToken)
        } catch (err) {
            if (err instanceof AxiosError) return rejectWithValue(err.status)
            console.log(err, 'Неизвестная ошибка')
            rejectWithValue(500)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout()
            accessToken.resetToken()
        } catch (err) {
            if (err instanceof AxiosError) return rejectWithValue(err.status)
            console.log(err, 'Неизвестная ошибка')
            rejectWithValue(500)
        }
    }
)

export const checkAuthStatus = createAsyncThunk(
    'auth/authStatus',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post<Token>(
                `${BASE_URL}/auth/refresh`,
                {
                    refreshToken: localStorage.getItem('refreshToken'),
                }
            )
            localStorage.setItem('refreshToken', response.data.refreshToken)
            accessToken.setToken(response.data.accessToken)
        } catch (err) {
            if (err instanceof AxiosError) return rejectWithValue(err.status)
            console.log(err, 'Неизвестная ошибка')
            return rejectWithValue(500)
        }
    }
)
