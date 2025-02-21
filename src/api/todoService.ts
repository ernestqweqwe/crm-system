import axios from 'axios'
import { AllTodosResponse, TokenResponse } from './responseTypes'

const BASE_URL = 'https://easydev.club/api/v1'

const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
})

httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export const getToken = async (): Promise<TokenResponse> => {
    try {
        const response = await axios.post<TokenResponse>(`${BASE_URL}/auth/signin`, {
            login: 'aaaassss',
            password: '1236521',
        })

        return response.data
    } catch {
        throw new Error('Ошибка получения токена')
    }
}

export const getAllTodos = async (chosenTodos: string): Promise<AllTodosResponse> => {
    try {
        const response = await httpClient.get<AllTodosResponse>(`/todos`, {
            params: { filter: chosenTodos },
        })
        return response.data
    } catch {
        throw new Error('Ошибка получения списка задач')
    }
}

export const deleteTodo = async (taskId: number): Promise<void> => {
    try {
        await httpClient.delete(`/todos/${taskId}`)
    } catch {
        throw new Error('Ошибка при удалении задачи')
    }
}

export const createTodo = async (title: string): Promise<void> => {
    try {
        await httpClient.post(`/todos`, {
            isDone: false,
            title,
        })
    } catch {
        throw new Error('Ошибка создания  задачи')
    }
}

export const updateTodo = async (taskId: number, title: string, isDone: boolean): Promise<void> => {
    try {
        await httpClient.put(`/todos/${taskId}`, {
            isDone,
            title,
        })
    } catch {
        throw new Error('Ошибка обнавления задачи')
    }
}
