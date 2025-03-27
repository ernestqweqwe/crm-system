import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TabFilters } from 'src/store/reducers/slices/taskListSlice/taskListSlice.ts'
import { AllTodosResponse } from 'types/responseTypes'

interface updateTodoProps {
    id: number
    isDone: boolean
    title: string
}

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://easydev.club/api/v1/' }),
    tagTypes: ['Todos'],
    endpoints: (build) => ({
        getAllTodos: build.query<AllTodosResponse, string>({
            query: (filter: TabFilters) => ({
                url: `/todos`,
                params: {
                    filter: filter,
                },
            }),
            providesTags: ['Todos'],
        }),
        deleteTodo: build.mutation<void, number>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos'],
        }),
        createTodo: build.mutation<void, string>({
            query: (task) => ({
                url: `/todos`,
                method: 'POST',
                body: {
                    isDone: false,
                    title: task,
                },
            }),
            invalidatesTags: ['Todos'],
        }),

        updateTodo: build.mutation<void, updateTodoProps>({
            query: ({ id, title, isDone }) => ({
                url: `/todos/${id}`,
                method: 'PUT',
                body: {
                    title,
                    isDone,
                },
            }),
            invalidatesTags: ['Todos'],
        }),
    }),
})
