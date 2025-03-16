import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    login,
    isAuth,
    logout,
} from 'store/reducers/slices/authSlice/asyncThunks'

interface userInitialState {
    isAuth: boolean
    isLoading: boolean
    accessToken: string
}

const initialState: userInitialState = {
    isAuth: false,
    isLoading: true,
    accessToken: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isAuth = true
                state.isLoading = false
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuth = false
                state.isLoading = false
                state.accessToken = ''
            })
            .addCase(logout.rejected, (state) => {
                state.isAuth = false
                state.isLoading = false
                state.accessToken = ''
            })
            .addCase(isAuth.pending, (state) => {
                state.isLoading = true
            })
            .addCase(isAuth.fulfilled, (state) => {
                state.isAuth = true
                state.isLoading = false
            })
            .addCase(isAuth.rejected, (state) => {
                state.isAuth = false
                state.isLoading = false
            })
    },
})

export const { setAuth, setLoading, setAccessToken } = authSlice.actions
