import { AppDispatch } from '../../../store.ts'
import { dataSlice } from './DataSlice.ts'
import axios, { AxiosError } from 'axios'
import { AllTodosResponse } from '../../../../types/responseTypes.ts'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchData = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(dataSlice.actions.dataFetching())
        const response = await axios.get<AllTodosResponse>(`${BASE_URL}/todos`)
        dispatch(dataSlice.actions.dataFetchingSuccess(response.data))
    } catch (error) {
        if (error instanceof AxiosError)
            dispatch(dataSlice.actions.dataFetchingError(error.message))
    }
}

// TODO поменять пути на обсолютные
