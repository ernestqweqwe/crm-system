import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AllTodosResponse } from '../../../../types/responseTypes.ts'

interface DataState {
    data: AllTodosResponse
    isLoading: boolean
    error: string
}

const initialState: DataState = {
    data: {
        data: [],
        info: {
            all: 0,
            completed: 0,
            inWork: 0,
        },
        meta: {
            totalAmount: 0,
        },
    },
    isLoading: false,
    error: '',
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        dataFetching(state) {
            state.isLoading = true
        },
        dataFetchingSuccess(state, action: PayloadAction<AllTodosResponse>) {
            state.isLoading = false
            state.error = ''
            state.data = action.payload
        },
        dataFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
    },
})

export default dataSlice.reducer
