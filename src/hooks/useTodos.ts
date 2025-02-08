import { useEffect, useState } from 'react'
import { getAllTodos, getToken, deleteTodo } from '../api/todoService'

interface Todo {
    id: number
    title: string
    created: string
    isDone: boolean
}
export const useTodos = () => {
    const [token, setToken] = useState<string | null>(null)
    const [todos, setTodos] = useState<Todo[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getToken()
            .then(setToken)
            .catch((err) => setError(err.message))
    }, [])

    useEffect(() => {
        if (token) {
            getAllTodos(token)
                .then(setTodos)
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false))
        }
    }, [token])

    const handleDelete = async (taskId: number) => {
        if (!token) return
        try {
            await deleteTodo(token, taskId)
            const updatedTodos = await getAllTodos(token)
            setTodos(updatedTodos)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
        }
    }

    return { todos, loading, error, handleDelete }
}
