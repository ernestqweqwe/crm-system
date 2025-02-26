import { AxiosResponse } from 'axios'
import { AllTodosResponse } from '../../types/responseTypes.ts'
import { $todoApi } from '../http'

export async function getTodosData(filter: string): Promise<AxiosResponse<AllTodosResponse>> {
    return await $todoApi.get('todos', {
        params: {
            filter,
        },
    })
}

export async function deleteTask(taskId: number) {
    await $todoApi.delete(`todos/${taskId}`)
}

export async function createTask(title: string) {
    await $todoApi('todos', {
        method: 'post',
        data: {
            title,
            isDone: false,
        },
    })
}

export async function updateTask(taskId: number, title: string, isDone: boolean) {
    return $todoApi(`todos/${taskId}`, {
        method: 'put',
        data: {
            title,
            isDone,
        },
    })
}
