import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authSlice } from 'store/reducers/slices/authSlice/authSlice'
import { taskSlice } from 'store/reducers/slices/taskSlice/taskSlice.ts'

export const store = configureStore({
    reducer: {
        task: taskSlice.reducer,
        auth: authSlice.reducer,
    },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
