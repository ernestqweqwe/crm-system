import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AllTodosResponse, Info, Meta } from 'src/types/responseTypes'
import {
    fetchAllTaskData,
    fetchCreateTask,
    fetchDeleteTask,
    fetchUpdateTask,
} from 'store/reducers/slices/taskSlice/asyncThunks'

export enum TabFilters {
    ALL = 'all',
    INWORK = 'inWork',
    COMPLETED = 'completed',
}

interface taskInitialState {
    data: AllTodosResponse
    isLoading: boolean
    error: string
    tabFilter: TabFilters
}

const initialState: taskInitialState = {
    data: {
        data: [],
        info: {} as Info,
        meta: {} as Meta,
    },
    isLoading: false,
    error: '',
    tabFilter: TabFilters.ALL,
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<TabFilters>) => {
            state.tabFilter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTaskData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(
                fetchAllTaskData.fulfilled,
                (state, action: PayloadAction<AllTodosResponse>) => {
                    state.isLoading = false
                    state.data = action.payload
                }
            )
            .addCase(fetchAllTaskData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })

            .addCase(fetchUpdateTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchUpdateTask.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(fetchUpdateTask.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
            .addCase(fetchDeleteTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchDeleteTask.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(fetchDeleteTask.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
            .addCase(fetchCreateTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCreateTask.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(fetchCreateTask.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    },
})

export const { setFilter } = taskSlice.actions

export default taskSlice.reducer

//TODO использывать контейнер xl sl
