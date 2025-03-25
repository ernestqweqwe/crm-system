import { BaseQueryFn } from '@reduxjs/toolkit/query'
import { AxiosError } from 'axios'
import { $api } from 'src/api/http'

export const customBaseQuery =
    (): BaseQueryFn<
        {
            url: string
            method?: string
            data?: unknown
            params?: unknown
        },
        unknown,
        unknown
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
            const err = axiosError as AxiosError
            return { error: err.response?.data || err.message }
        }
    }
