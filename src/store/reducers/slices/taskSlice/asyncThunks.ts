import { createAsyncThunk } from '@reduxjs/toolkit'
import todoService from 'api/services/TodoService'
import { AxiosError } from 'axios'
import { RootState } from 'store/store'
import { TabFilters } from 'store/reducers/slices/taskSlice/taskSlice.ts'

export const fetchAllTaskData = createAsyncThunk(
    'task/fetchAll',
    async (tabFilter: TabFilters, { rejectWithValue }) => {
        try {
            const response = await todoService.getTodos(tabFilter)
            return response.data
        } catch (e) {
            return rejectWithValue(e instanceof AxiosError ? e.message : 'Неизвестиная ошибка')
        }
    }
)

export const fetchUpdateTask = createAsyncThunk(
    'task/update',
    async (
        { taskId, title, isDone }: { taskId: number; title: string; isDone: boolean },
        { rejectWithValue, dispatch, getState }
    ) => {
        try {
            await todoService.updateTask(taskId, title, isDone)
            const tabFilter = (getState() as RootState).task.tabFilter
            await dispatch(fetchAllTaskData(tabFilter))
        } catch (e) {
            return rejectWithValue(e instanceof AxiosError ? e.message : 'Неизвестиная ошибка')
        }
    }
)

export const fetchDeleteTask = createAsyncThunk(
    'task/delete',
    async (taskId: number, { rejectWithValue, dispatch, getState }) => {
        try {
            await todoService.deleteTask(taskId)
            const tabFilter = (getState() as RootState).task.tabFilter
            await dispatch(fetchAllTaskData(tabFilter))
        } catch (e) {
            return rejectWithValue(e instanceof AxiosError ? e.message : 'Неизвестиная ошибка')
        }
    }
)

export const fetchCreateTask = createAsyncThunk(
    'task/create',
    async (title: string, { rejectWithValue, dispatch, getState }) => {
        try {
            await todoService.createTask(title)
            const tabFilter = (getState() as RootState).task.tabFilter
            await dispatch(fetchAllTaskData(tabFilter))
        } catch (e) {
            return rejectWithValue(e instanceof AxiosError ? e.message : 'Неизвестиная ошибка')
        }
    }
)

// TODO переработать структура папок
