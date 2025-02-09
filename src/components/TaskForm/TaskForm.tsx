import * as React from 'react'
import { FC, useRef, useState } from 'react'
import './TaskForm.scss'

interface TaskFormProps {
    create: (title: string) => Promise<void>
}

const TaskForm: FC<TaskFormProps> = ({ create }) => {
    const [title, setTitle] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!title.trim()) {
            inputRef.current?.reportValidity()
            return
        }
        await create(title)
        setTitle('')
    }

    return (
        <form className="tasks-form" onSubmit={handleSubmit}>
            <input
                placeholder="Введите вашу задачу..."
                minLength={2}
                maxLength={64}
                required={true}
                type="text"
                ref={inputRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" className="tasks-form__btn">
                ADD
            </button>
        </form>
    )
}

export default TaskForm
