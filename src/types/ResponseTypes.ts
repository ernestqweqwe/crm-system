export type TokenResponse = {
    accessToken: 'string'
}

export type Todo = {
    created: string
    id: number
    isDone: boolean
    title: string
}

export type Info = {
    all: number
    completed: number
    inWork: number
}

export type Meta = {
    totalAmount: number
}

export type AllTodosResponce = {
    data: Todo[]
    info: Info
    meta: Meta
}
