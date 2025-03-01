import { $api } from 'api/http/index'
import { AxiosResponse } from 'axios'
import { AllTodosResponse } from 'types/responseTypes'

export interface UpdateTaskProps {
    taskId: number
    title: string
    isDone: boolean
}

class TodoService {
    static async getTodos(filter: string): Promise<AxiosResponse<AllTodosResponse>> {
        return await $api.get('todos', { params: { filter } })
    }

    static async deleteTask(taskId: number): Promise<void> {
        await $api.delete(`todos/${taskId}`)
    }

    static async createTask(title: string): Promise<void> {
        await $api.post('todos', { title, isDone: false })
    }

    static async updateTask(
        taskId: number,
        title: string,
        isDone: boolean
    ): Promise<AxiosResponse> {
        return await $api.put(`todos/${taskId}`, { title, isDone })
    }
}

export default TodoService
