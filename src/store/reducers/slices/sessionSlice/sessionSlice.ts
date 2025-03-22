import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    login,
    checkAuthStatus,
    logout,
} from 'src/store/reducers/slices/sessionSlice/sessionAsyncThunks.ts'

interface userInitialState {
    isAuth: boolean
    isLoading: boolean
}

const initialState: userInitialState = {
    isAuth: false,
    isLoading: true,
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
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
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(checkAuthStatus.pending, (state) => {
                state.isLoading = true
            })
            .addCase(checkAuthStatus.fulfilled, (state) => {
                state.isAuth = true
                state.isLoading = false
            })
            .addCase(checkAuthStatus.rejected, (state) => {
                state.isAuth = false
                state.isLoading = false
            })
    },
})

export const { setAuth, setLoading } = sessionSlice.actions
