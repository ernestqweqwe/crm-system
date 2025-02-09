import * as React from 'react'
import { FC, useState } from 'react'
import './TaskForm.scss'

interface TaskFormProps {
    create: (title: string) => Promise<void>
}

const TaskForm: FC<TaskFormProps> = ({ create }) => {
    const [title, setTitle] = useState<string>('')

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>, title: string) => {
        e.preventDefault()
        await create(title)
        setTitle('')
    }

    return (
        <form className="tasks-form">
            <input
                placeholder="Введите вашу задачу..."
                minLength={2}
                maxLength={64}
                required={true}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button className="tasks-form__btn" onClick={(e) => handleClick(e, title)}>
                ADD
            </button>
        </form>
    )
}

export default TaskForm
