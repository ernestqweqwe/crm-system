import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Profile } from 'src/types/authTypes.ts'
import { getProfile } from 'src/store/reducers/slices/userSlice/userAsyncThunks.ts'

interface taskInitialState {
    profile: Profile | null
}

const initialState: taskInitialState = {
    profile: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<Profile>) => {
            state.profile = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProfile.fulfilled, (state, action) => {
            if (action.payload) {
                state.profile = action.payload as Profile
            }
        })
    },
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer
