import axios, { AxiosResponse } from 'axios'
import { BASE_URL } from 'src/constants'
import { AllTodosResponse } from 'types/responseTypes'

export type Filter = 'all' | 'inWork' | 'completed'

const todosApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        accept: 'application/json',
    },
})

export async function getTodosData(filter: Filter): Promise<AllTodosResponse> {
    try {
        const response: AxiosResponse<AllTodosResponse> = await todosApi.get('/todos', {
            params: {
                filter,
            },
        })
        return response.data
    } catch (error) {
        console.log(error, 'Ошибка получения тасок')
        throw error
    }
}

export async function deleteTask(taskId: number) {
    try {
        await todosApi.delete(`/todos/${taskId}`)
    } catch (error) {
        console.log(error, 'Ошибка при удалении таски')
        throw error
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
    } catch (error) {
        console.log(error, 'Ошибка при создания таски')
        throw error
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
    } catch (error) {
        console.log(error, 'Ошибка обновления таски')
        throw error
    }
}
