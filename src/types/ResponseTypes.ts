export type TokenResponse = {
    accessToken: 'string'
}

export type Todo = {
    created: string
    description: string
    executor: string
    id: number
    isDone: boolean
    title: string
}

export type TodoInfo = {
    all: number
    completed: number
    inWork: number
}

export type Meta = {
    totalAmount: number
}

export type MetaResponce<T, N> = {
    data: T[]
    info: N
    meta: Meta
}
