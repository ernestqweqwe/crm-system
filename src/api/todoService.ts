import axios, { AxiosResponse } from 'axios'
import { AllTodosResponse } from '../types/responseTypes.ts'

const http = axios.create({
    baseURL: 'https://easydev.club/api/v1/',
})

export async function getTodosData(filter: string) {
    const response: AxiosResponse<AllTodosResponse> = await http.get('todos', {
        params: {
            filter,
        },
    })
    return response.data
}

export async function deleteTask(taskId: number) {
    await http.delete(`todos/${taskId}`)
}

export async function createTask(title: string) {
    await http('todos', {
        method: 'post',
        data: {
            title,
            isDone: false,
        },
    })
}

export async function updateTask(taskId: number, title: string, isDone: boolean) {
    return http(`todos/${taskId}`, {
        method: 'put',
        data: {
            title,
            isDone,
        },
    })
}
