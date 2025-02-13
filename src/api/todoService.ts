import { AllTodosResponce, TokenResponse } from '../types/ResponseTypes'

const api = 'https://easydev.club/api/v1'

export const getToken = async (): Promise<TokenResponse> => {
    try {
        const response = await fetch(`${api}/auth/signin`, {
            method: 'Post',
            body: JSON.stringify({
                login: 'ernest',
                password: '123652',
            }),
        })

        if (!response.ok) throw new Error()

        const data = await response.json()
        return data
    } catch {
        throw new Error('Ошибка получения токена')
    }
}

export const getAllTodos = async (
    token: string,
    chosenTodos: string
): Promise<AllTodosResponce> => {
    try {
        const response = await fetch(`${api}/todos?filter=${chosenTodos}`, {
            headers: { Authorization: `Bearer ${token}` },
            method: 'GET',
        })
        if (!response.ok) throw new Error()

        const data = await response.json()
        return data
    } catch {
        throw new Error('Ошибка загрузки постов')
    }
}

export const deleteTodo = async (token: string, taskId: number) => {
    try {
        const response = await fetch(`${api}/todos/${taskId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.ok) throw new Error()
    } catch {
        throw new Error('Ошибка при удалении')
    }
}

export const creteTodo = async (token: string, title: string) => {
    try {
        const response = await fetch(`${api}/todos`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
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

export const updateTodo = async (token: string, taskId: number, title: string, isDone: boolean) => {
    try {
        const response = await fetch(`${api}/todos/${taskId}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
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
