import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from 'api/services/AuthService'
import axios, { AxiosError } from 'axios'
import { AuthData, Token } from 'types/authTypes'
import { tokenService } from 'src/api/services/TokenServise.ts'
import { setAuth } from 'src/store/reducers/slices/sessionSlice/sessionSlice.ts'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const login = createAsyncThunk(
    'auth/login',
    async (props: AuthData, { rejectWithValue }) => {
        try {
            const response = await authService.login(props)
            tokenService.setToken(response.accessToken)
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
            tokenService.clearToken()
            localStorage.removeItem('refreshToken')
        } catch (err) {
            if (err instanceof AxiosError) return rejectWithValue(err.status)
            console.log(err, 'Неизвестная ошибка')
            rejectWithValue(500)
        }
    }
)

export const checkAuthStatus = createAsyncThunk(
    'auth/authStatus',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post<Token>(
                `${BASE_URL}/auth/refresh`,
                {
                    refreshToken: localStorage.getItem('refreshToken'),
                }
            )
            localStorage.setItem('refreshToken', response.data.refreshToken)
            tokenService.setToken(response.data.accessToken)
            dispatch(setAuth(true))
        } catch (err) {
            if (err instanceof AxiosError) return rejectWithValue(err.status)
            console.log(err, 'Неизвестная ошибка')
            return rejectWithValue(500)
        }
    }
)
