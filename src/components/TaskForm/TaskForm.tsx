import * as React from 'react'
import { useState } from 'react'

interface TaskFormProps {
    create: (title: string) => Promise<void>
}

function TaskForm({ create }: TaskFormProps) {
    const [title, setTitle] = useState<string>('')

    const handleClick = async (
        e: React.MouseEvent<HTMLButtonElement>,
        title: string
    ) => {
        e.preventDefault()
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
