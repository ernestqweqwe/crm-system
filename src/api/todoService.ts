import { MetaResponce, Todo, TodoInfo } from '../types/ResponseTypes'

const api = 'https://easydev.club/api/v1'

export const getAllTodos = async (chosenTodos: string): Promise<MetaResponce<Todo, TodoInfo>> => {
    try {
        const response = await fetch(`${api}/todos?filter=${chosenTodos}`, {
            method: 'GET',
        })
        if (!response.ok) throw new Error()

        const data: Promise<MetaResponce<Todo, TodoInfo>> = await response.json()
        return data
    } catch {
        throw new Error('Ошибка загрузки постов')
    }
}

export const deleteTodo = async (taskId: number) => {
    try {
        const response = await fetch(`${api}/todos/${taskId}`, {
            method: 'DELETE',
        })
        if (!response.ok) throw new Error()
    } catch {
        throw new Error('Ошибка при удалении ')
    }
}

export const creteTodoItem = async (title: string) => {
    try {
        const response = await fetch(`${api}/todos`, {
            method: 'POST',
            body: JSON.stringify({
                isDone: false,
                title,
            }),
        })

        if (!response.ok) throw new Error()
    } catch {
        throw new Error('Ошибка при создании todo ')
    }
}

export const updateTodo = async (isDone: boolean, taskId: number, title: string) => {
    try {
        const response = await fetch(`${api}/todos/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify({
                isDone,
                title,
            }),
        })

        if (!response.ok) throw new Error()
    } catch {
        throw new Error('Ошибка при создании todo ')
    }
}
