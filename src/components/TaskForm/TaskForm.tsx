import * as React from 'react'
import { FC, useRef, useState } from 'react'
import './TaskForm.scss'

interface TaskFormProps {
    create: (title: string) => Promise<void>
}

interface TitleProps {
    task: string
    executor: string
    description: string
}

const TaskForm: FC<TaskFormProps> = ({ create }) => {
    const [title, setTitle] = useState<TitleProps>({
        task: '',
        executor: '',
        description: '',
    })
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!title.task.trim()) {
            inputRef.current?.reportValidity()
            return
        }
        await create(title.task)
        setTitle({
            task: '',
            executor: '',
            description: '',
        })
    }

    return (
        <form className="tasks-form" onSubmit={handleSubmit}>
            <div className="inputs-container">
                <input
                    className="main-input"
                    placeholder="Enter your task... *"
                    minLength={2}
                    maxLength={64}
                    required={true}
                    type="text"
                    ref={inputRef}
                    value={title.task}
                    onChange={(e) => setTitle({ ...title, task: e.target.value })}
                />
                <input
                    value={title.executor}
                    onChange={(e) => setTitle({ ...title, executor: e.target.value })}
                    className="additional-input"
                    type="text"
                    placeholder="Executor"
                />
                <input
                    value={title.description}
                    onChange={(e) => setTitle({ ...title, description: e.target.value })}
                    className="additional-input"
                    type="text"
                    placeholder="Description"
                />
            </div>
            <button type="submit" className="tasks-form__btn">
                ADD
            </button>
        </form>
    )
}

export default TaskForm
