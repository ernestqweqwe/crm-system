import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchLogin, isAuth, logout } from 'store/reducers/slices/authSlice/asyncThunks'

interface userInitialState {
    isAuth: boolean
    isLoading: boolean
}

const initialState: userInitialState = {
    isAuth: false,
    isLoading: true,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.fulfilled, (state) => {
                state.isAuth = true
                state.isLoading = false
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuth = false
                state.isLoading = false
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

export const { setAuth } = authSlice.actions
