import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AllTodosResponse } from 'types/responseTypes'
import { TabFilters } from 'src/store/reducers/slices/taskListSlice/taskListSlice.ts'

interface updateTodoProps {
    id: number
    isDone: boolean
    title: string
}

export const taskListService = createApi({
    reducerPath: 'taskListService',
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
