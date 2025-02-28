import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchLogin } from 'store/reducers/slices/authSlice/asyncThunks'

interface userInitialState {
    isAuth: boolean
}

const initialState: userInitialState = {
    isAuth: false,
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
        builder.addCase(fetchLogin.fulfilled, (state) => {
            state.isAuth = true
        })
    },
})

export const { setAuth } = authSlice.actions
