import axios, { AxiosResponse } from 'axios'
import { AllTodosResponse } from '../types/responseTypes.ts'

const todosApi = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
        accept: 'application/json',
    },
})

export async function getTodosData(filter: string): Promise<AllTodosResponse | null> {
    try {
        const response: AxiosResponse<AllTodosResponse> = await todosApi.get('/todos', {
            params: {
                filter,
            },
        })
        return response.data
    } catch (e) {
        console.log(e, 'Ошибка получения тасок')
        return null
    }
}

export async function deleteTask(taskId: number) {
    try {
        await todosApi.delete(`/todos/${taskId}`)
    } catch (e) {
        console.log(e, 'Ошибка при удалении таски')
    }
}

export async function createTask(title: string) {
    try {
        await todosApi('/todos', {
            method: 'post',
            data: {
                title,
                isDone: false,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (e) {
        console.log(e, 'Ошибка при создания таски')
    }
}

export async function updateTask(taskId: number, title: string, isDone: boolean) {
    try {
        await todosApi(`/todos/${taskId}`, {
            method: 'put',
            data: {
                title,
                isDone,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (e) {
        console.log(e, 'Ошибка обновления таски')
    }
}
