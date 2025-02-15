import { useEffect, useState } from 'react'
import { getAllTodos, getToken, deleteTodo, updateTodo } from '../api/todoService'

interface Todo {
    id: number
    title: string
    created: string
    isDone: boolean
}

export interface Info {
    all: number
    completed: number
    inWork: number
}

export const useTodos = () => {
    const [token, setToken] = useState<string>('')
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [info, setInfo] = useState<Info | null>(null)
    const [chosenTodos, setChosenTodos] = useState<string>('all')

    useEffect(() => {
        getToken()
            .then((res) => setToken(res))
            .catch((err) => setError(err.message))
    }, [])

    useEffect(() => {
        if (token) {
            getAllTodos(token, chosenTodos)
                .then((res) => {
                    setTodos(res.data)
                    setInfo(res.info)
                })
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false))
        }
    }, [token, chosenTodos])

    const handleDelete = async (taskId: number) => {
        await deleteTodo(token, taskId).catch((err) => setError(err.message))
        const updatedTodos = await getAllTodos(token, chosenTodos)
        setTodos(updatedTodos.data)
        setInfo(updatedTodos.info)
    }

    const handleUpdate = async (taskId: number, title: string, isDone: boolean) => {
        await updateTodo(token, taskId, title, isDone).catch((err) => setError(err.message))
        const updatedTodos = await getAllTodos(token, chosenTodos)
        setTodos(updatedTodos.data)
        setInfo(updatedTodos.info)
    }

    const handleReload = () => {
        getAllTodos(token, chosenTodos).then((res) => {
            setTodos(res.data)
            setInfo(res.info)
            setError('')
        })
        console.log('reload')
    }

    return {
        todos,
        token,
        loading,
        error,
        info,
        chosenTodos,
        handleReload,
        handleDelete,

        handleUpdate,
        setChosenTodos,
    }
}
