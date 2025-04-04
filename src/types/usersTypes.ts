export interface MetaResponse<T> {
    data: T[]
    meta: {
        totalAmount: number
        sortBy: string
        sortOrder: 'asc' | 'desc'
    }
}

export interface User {
    id: number
    username: string
    email: string
    date: string // ISO date string
    isBlocked: boolean
    roles: Roles[]
    phoneNumber: string
}

export enum Roles {
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
    USER = 'USER',
}

export interface UpdateUser {
    email?: string
    phoneNumber?: string
    username?: string
    id: string
}

export interface UpdateUserRights {
    id: number
    roles: Roles[]
}

export interface UserFilters {
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    isBlocked?: boolean
    limit?: number
    offset?: number
}
