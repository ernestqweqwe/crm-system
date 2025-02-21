import { useEffect, useState } from 'react'
import { getAllTodos, getToken, deleteTodo, createTodo, updateTodo } from '../api/todoService'
import { Data, Info } from '../api/responseTypes'

export const useTodos = () => {
    const [todos, setTodos] = useState<Data[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [info, setInfo] = useState<Info>({ all: 0, completed: 0, inWork: 0 })
    const [chosenTodos, setChosenTodos] = useState<string>('all')

    useEffect(() => {
        getToken()
            .then((res) => localStorage.setItem('token', res.accessToken))
            .catch((err) => setError(err.message))
    }, [])

    useEffect(() => {
        getAllTodos(chosenTodos)
            .then((res) => {
                setTodos(res.data)
                setInfo(res.info)
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [chosenTodos])

    const handleDelete = async (taskId: number) => {
        try {
            await deleteTodo(taskId)
            const updatedTodos = await getAllTodos(chosenTodos)
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
            await createTodo(title)
            const updatedTodos = await getAllTodos(chosenTodos).then((res) => res)
            setTodos(updatedTodos.data)
            setInfo(updatedTodos.info)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
        }
    }

    const handleUpdate = async (taskId: number, title: string, isDone: boolean) => {
        try {
            await updateTodo(taskId, title, isDone)
            const updatedTodos = await getAllTodos(chosenTodos).then((res) => res)
            setTodos(updatedTodos.data)
            setInfo(updatedTodos.info)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
        }
    }

    const handleReload = () => {
        getAllTodos(chosenTodos)
            .then((res) => {
                setTodos(res.data)
                setInfo(res.info)
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    return {
        todos,
        loading,
        error,
        handleDelete,
        handleCreate,
        info,
        handleUpdate,
        setChosenTodos,
        chosenTodos,
        handleReload,
    }
}
