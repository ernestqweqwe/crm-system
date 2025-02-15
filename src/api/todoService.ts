import { MetaResponce, Todo, TodoInfo } from '../types/ResponseTypes'

const api = 'https://easydev.club/api/v2'

export const getToken = async (): Promise<string> => {
    try {
        const response = await fetch(`${api}/auth/signin`, {
            method: 'Post',
            body: JSON.stringify({
                login: 'ernest',
                password: '123652',
            }),
        })

        if (!response.ok) throw new Error()
        const token = await response.json().then((res) => res.accessToken)
        return token
    } catch {
        throw new Error('Ошибка получения токена')
    }
}

export const getAllTodos = async (chosenTodos: string): Promise<MetaResponce<Todo, TodoInfo>> => {
    try {
        const response = await fetch(`${api}/todos?filter=${chosenTodos}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        if (!response.ok) throw new Error()
    } catch {
        throw new Error('Ошибка при удалении')
    }
}

export const creteTodoItem = async (title: string, description: string, executor: string) => {
    try {
        const response = await fetch(`${api}/todos`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({
                isDone: false,
                title,
                description,
                executor,
            }),
        })

        if (!response.ok) throw new Error()
    } catch {
        throw new Error('Ошибка при создании todo ')
    }
}

export const updateTodo = async (
    isDone: boolean,
    taskId: number,
    title: string,
    description: string,
    executor: string
) => {
    try {
        const response = await fetch(`${api}/todos/${taskId}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({
                isDone,
                title,
                description,
                executor,
            }),
        })

        if (!response.ok) throw new Error()
    } catch {
        throw new Error('Ошибка при создании todo ')
    }
}
