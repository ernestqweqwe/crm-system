import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TabFilters = 'all' | 'inWork' | 'completed'

interface taskInitialState {
    tabFilter: TabFilters
}

const initialState: taskInitialState = {
    tabFilter: 'all',
}

export const taskListSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<TabFilters>) => {
            state.tabFilter = action.payload
        },
    },
})

export const { setFilter } = taskListSlice.actions

export default taskListSlice.reducer
