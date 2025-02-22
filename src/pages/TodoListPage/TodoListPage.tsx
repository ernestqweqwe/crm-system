import TaskForm from '../../components/TaskForm/TaskForm'
import './index.scss'
import { useEffect, useState } from 'react'
import { AllTodosResponse } from '../../api/responseTypes.ts'
import { getTodosData } from '../../api/todoService.ts'
import TaskInfo from '../../components/TaskInfo/TaskInfo.tsx'

export const TodoListPage = () => {

    const [data, setData] = useState<AllTodosResponse | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>('all')
    const [error, setError] = useState('')

    async function fetchData () {
        const response = await getTodosData(activeFilter)
            setData(response);
    };

    useEffect(() => {
        fetchData().then()
        console.log('Ошиька', error)
    }, [activeFilter, error]);


    // TODO модалка для ошибок всплывающая на пару сек использовать готовые компоненты alert или message

    // TODO skeleton and spinner
    // TODO collapse использовать для выподающих 2х инпутов
    // TODO empty когда нет списков задач
    // TODO Typography для текста
    return (
        <>
                <div className="todo-list__page">
                    {data && <>
                        <TaskForm setError={setError} />
                        <TaskInfo activeFilter={activeFilter} setActiveFilter={setActiveFilter}  info={data.info} />
                        {/*<button onClick={()=>console.log(data)}>button</button>*/}
                    </>}
                    {/*{todos.length !== 0 ? (*/}
                    {/*    <TaskList*/}
                    {/*        onUpdate={handleUpdate}*/}
                    {/*        taskList={todos}*/}
                    {/*        onDelete={handleDelete}*/}
                    {/*    />*/}
                    {/*) : (*/}
                    {/*    <div style={{ marginTop: '30px', fontSize: '22px' }}>Нет задач</div>*/}
                    {/*)}*/}
                </div>

        </>
    )
}
