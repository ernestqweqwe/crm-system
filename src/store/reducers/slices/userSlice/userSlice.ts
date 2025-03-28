import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getProfile } from 'src/store/reducers/slices/userSlice/userAsyncThunks.ts'
import { User } from 'src/types/usersTypes.ts'

interface taskInitialState {
    profile: User | null
    isLoading: boolean
}

const initialState: taskInitialState = {
    profile: null,
    isLoading: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<User>) => {
            state.profile = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.fulfilled, (state, action) => {
                if (action.payload) {
                    state.profile = action.payload as User
                }
                state.isLoading = false
            })
            .addCase(getProfile.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true
            })
    },
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer
