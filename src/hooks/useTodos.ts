import { useEffect, useState } from 'react'
import { getAllTodos, getToken, deleteTodo, creteTodo } from '../api/todoService'

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
    const [info, setInfo] = useState<string | null>(null)

    useEffect(() => {
        getToken()
            .then(setToken)
            .catch((err) => setError(err.message))
    }, [])

    useEffect(() => {
        if (token) {
            getAllTodos(token)
                .then((res) => {
                    setTodos(res.data)
                    setInfo(res.info)
                })
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false))
        }
    }, [token])

    const handleDelete = async (taskId: number) => {
        if (!token) return
        try {
            await deleteTodo(token, taskId)
            const updatedTodos = await getAllTodos(token).then((res) => res)
            setTodos(updatedTodos.data)
            setInfo(updatedTodos.info)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
        }
    }

    const handleCreate = async (title: string) => {
        try {
            if (!token) return
            await creteTodo(token, title)
            const updatedTodos = await getAllTodos(token).then((res) => res.data)
            setTodos(updatedTodos)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
        }
    }

    return { todos, loading, error, handleDelete, handleCreate, info }
}
