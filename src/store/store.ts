import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { todoApi } from 'src/store/services/taskListService.ts'
import { taskListSlice } from 'src/store/reducers/slices/taskListSlice/taskListSlice.ts'
import { sessionSlice } from 'src/store/reducers/slices/sessionSlice/sessionSlice.ts'
import { userSlice } from 'src/store/reducers/slices/userSlice/userSlice.ts'

export const store = configureStore({
    reducer: {
        taskList: taskListSlice.reducer,
        session: sessionSlice.reducer,
        user: userSlice.reducer,
        [todoApi.reducerPath]: todoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
