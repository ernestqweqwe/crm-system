const api = 'https://easydev.club/api/v1'

export const getToken = async (): Promise<string> => {
    const response = await fetch(`${api}/auth/signin`, {
        method: 'Post',
        body: JSON.stringify({
            login: 'ernest',
            password: '123652',
        }),
    })
    if (!response.ok) throw new Error('Ошибка получения токена')
    const data = await response.json()
    return data.accessToken
}

export const getAllTodos = async (token: string) => {
    const response = await fetch(`${api}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'GET',
    })
    if (!response.ok) throw new Error('Ошибка загрузки задач')

    const data = await response.json()
    return data.data
}

export const deleteTodo = async (token: string, taskId: number) => {
    const response = await fetch(`${api}/todos/${taskId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error('Ошибка при удалении')
}
