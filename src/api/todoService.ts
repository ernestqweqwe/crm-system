import { $api } from './authService.ts'
import { AxiosResponse } from 'axios'
import { AllTodosResponse } from '../types/responseTypes.ts'

export interface createTodoProps {
    task: string
    description: string
    executor: string
}

export async function getTodosData(filter: string) {
    const response: AxiosResponse<AllTodosResponse> = await $api.get('todos', {
        params: {
            filter,
        },
    })
    return response.data
}

export async function deleteTask(taskId: number) {
    await $api.delete(`todos/${taskId}`)
}

export async function createTask(props: createTodoProps) {
    const { task, description = '', executor = '' } = props
    await $api('todos', {
        method: 'post',
        data: {
            title: task,
            description,
            executor,
            isDone: false,
        },
    })
}

export async function updateTask(taskId: number, title: string, isDone: boolean) {
    return $api(`todos/${taskId}`, {
        method: 'put',
        data: {
            title,
            isDone,
        },
    })
}
