import { api } from './authService.ts'
import { AxiosResponse } from 'axios'
import { AllTodosResponse} from './responseTypes.ts'

export async function getTodosData(filter:string){
        const response:AxiosResponse<AllTodosResponse> = await api.get('todos',{
            params:{
                filter
            }
        })
        return response.data

}
//
// export const deleteTodo = async (taskId: number): Promise<void> => {
//     try {
//         await httpClient.delete(`/todos/${taskId}`)
//     } catch {
//         throw new Error('Ошибка при удалении задачи')
//     }
// }
//
// export const createTodo = async (title: string): Promise<void> => {
//     try {
//         await httpClient.post(`/todos`, {
//             isDone: false,
//             title,
//         })
//     } catch {
//         throw new Error('Ошибка создания  задачи')
//     }
// }
//
// export const updateTodo = async (taskId: number, title: string, isDone: boolean): Promise<void> => {
//     try {
//         await httpClient.put(`/todos/${taskId}`, {
//             isDone,
//             title,
//         })
//     } catch {
//         throw new Error('Ошибка обнавления задачи')
//     }
// }
