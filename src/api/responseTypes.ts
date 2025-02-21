export type TokenResponse = {
    accessToken: string
    refreshToken: string
}

export type Data = {
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

export type AllTodosResponse = {
    data: Data[]
    info: Info
    meta: Meta
}
