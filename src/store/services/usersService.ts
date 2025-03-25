import { createApi } from '@reduxjs/toolkit/query/react'
import {
    MetaResponse,
    UpdateUser,
    UpdateUserRights,
    User,
} from 'src/types/usersTypes.ts'
import { customBaseQuery } from 'src/store/services/customBaseQuery.ts'
import { TableParams } from 'src/pages/UsersPage/ui/UsersPage.tsx'

const orderOfSorting: Record<'ascend' | 'descend', 'asc' | 'desc'> = {
    ascend: 'asc',
    descend: 'desc',
}

export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: customBaseQuery(),
    keepUnusedDataFor: 0,
    tagTypes: ['Users', 'User'],
    endpoints: (build) => ({
        getUsers: build.query<MetaResponse<User>, TableParams<User>>({
            query: ({ sortOrder, sortField, isBlocked, search }) => ({
                url: '/admin/users',
                params: {
                    sortOrder: sortOrder ? orderOfSorting[sortOrder] : null,
                    sortBy: sortField,
                    isBlocked: isBlocked === '' ? null : isBlocked,
                    search,
                },
            }),
            providesTags: ['Users'],
        }),
        deleteUser: build.mutation<string, number>({
            query: (id) => ({
                url: `/admin/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
        getUser: build.query<User, string>({
            query: (id) => ({
                url: `/admin/users/${id}`,
            }),
            providesTags: ['User'],
        }),
        updateUser: build.mutation<User, UpdateUser>({
            query: (userData) => ({
                url: `/admin/users/${userData.id}`,
                method: 'PUT',
                data: {
                    email: userData.email,
                    username: userData.username,
                    phoneNumber: userData.phoneNumber,
                },
            }),
            invalidatesTags: ['User'],
        }),
        blockUser: build.mutation<User, number>({
            query: (id) => ({
                url: `/admin/users/${id}/block`,
                method: 'POST',
            }),
            invalidatesTags: ['Users'],
        }),
        unBlockUser: build.mutation<User, number>({
            query: (id) => ({
                url: `/admin/users/${id}/unblock`,
                method: 'POST',
            }),
            invalidatesTags: ['Users'],
        }),
        updateRights: build.mutation<User, UpdateUserRights>({
            query: ({ id, roles }) => ({
                url: `/admin/users/${id}/rights`,
                method: 'POST',
                data: {
                    roles: roles,
                },
            }),
            invalidatesTags: ['Users'],
        }),
    }),
})
