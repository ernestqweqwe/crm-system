import { BaseQueryFn } from '@reduxjs/toolkit/query'
import { AxiosError } from 'axios'
import { $api } from 'src/api/http'

interface SerializedAxiosError {
    message: string
}

export const customBaseQuery =
    (): BaseQueryFn<
        {
            url: string
            method?: string
            data?: unknown
            params?: unknown
        },
        unknown,
        SerializedAxiosError
    > =>
    async ({ url, method = 'GET', data, params }) => {
        try {
            const result = await $api({
                url,
                method,
                data,
                params,
            })
            return { data: result.data }
        } catch (axiosError) {
            console.log(axiosError)
            const err = axiosError as AxiosError
            const serializedErr: SerializedAxiosError = {
                message: err.response?.data?.toString() || err.message,
            }
            return { error: serializedErr }
        }
    }
