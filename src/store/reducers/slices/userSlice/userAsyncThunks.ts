import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import UserService from 'src/api/services/UserService.ts'

export const getProfile = createAsyncThunk(
    'user/profile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await UserService.getProfile()
            return response.data
        } catch (err) {
            if (err instanceof AxiosError) return rejectWithValue(err.status)
            console.log(err, 'Неизвестная ошибка')
            rejectWithValue(500)
        }
    }
)
