import * as React from 'react'
import { FC, useState } from 'react'

interface TaskFormProps {
    create: (title: string) => Promise<void>
}

const TaskForm: FC<TaskFormProps> = ({ create }) => {
    const [title, setTitle] = useState<string>('')

    const handleClick = async (
        e: React.MouseEvent<HTMLButtonElement>,
        title: string
    ) => {
        e.preventDefault()
        if (title.length < 4) {
            console.log('неверная длина')
            return
        }
        await create(title)
        setTitle('')
    }

    return (
        <form>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={(e) => handleClick(e, title)}>Добавить</button>
        </form>
    )
}

export default TaskForm
