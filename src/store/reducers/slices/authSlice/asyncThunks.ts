import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from 'api/services/AuthService'
import axios, { AxiosError } from 'axios'
import { AuthData, Token } from 'types/authTypes'
import { setAccessToken } from 'src/store/reducers/slices/authSlice/authSlice.ts'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const login = createAsyncThunk(
    'auth/login',
    async (props: AuthData, { rejectWithValue, dispatch }) => {
        try {
            const response = await authService.login(props)
            dispatch(setAccessToken(response.accessToken))
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
        } catch (err) {
            if (err instanceof AxiosError) return rejectWithValue(err.status)
            console.log(err, 'Неизвестная ошибка')
            rejectWithValue(500)
        }
    }
)

export const isAuth = createAsyncThunk(
    'auth/isAuth',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post<Token>(
                `${BASE_URL}/auth/refresh`,
                {
                    refreshToken: localStorage.getItem('refreshToken'),
                }
            )
            dispatch(setAccessToken(''))
            localStorage.setItem('refreshToken', response.data.refreshToken)
        } catch (err) {
            if (err instanceof AxiosError) return rejectWithValue(err.status)
            console.log(err, 'Неизвестная ошибка')
            return rejectWithValue(500)
        }
    }
)
