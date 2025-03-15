import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { todoApi } from 'store/services/todosService'
import { taskSlice } from 'store/reducers/slices/taskSlice/taskSlice.ts'
import { authSlice } from './reducers/slices/authSlice/authSlice'

export const store = configureStore({
    reducer: {
        task: taskSlice.reducer,
        auth: authSlice.reducer,
        [todoApi.reducerPath]: todoApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
