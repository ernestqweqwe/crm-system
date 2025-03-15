import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from 'api/services/AuthService'
import axios, { AxiosError } from 'axios'
import { AuthData, Token } from 'types/authTypes'

const BASE_URL = import.meta.env.VITE_BASE_URL

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

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await authService.logout()
        localStorage.clear()
    } catch (err) {
        if (err instanceof AxiosError) return rejectWithValue(err.status)
        console.log(err, 'Неизвестная ошибка')
        rejectWithValue(500)
    }
})

export const isAuth = createAsyncThunk('auth/isAuth', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post<Token>(`${BASE_URL}/auth/refresh`, {
            refreshToken: localStorage.getItem('refreshToken'),
        })
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
    } catch (err) {
        if (err instanceof AxiosError) return rejectWithValue(err.status)
        console.log(err, 'Неизвестная ошибка')
        return rejectWithValue(500)
    }
})
