import { configureStore } from '@reduxjs/toolkit'
import { dataSlice } from './reducers/slices/DataSlice/DataSlice.ts'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        data: dataSlice.reducer,
    },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
