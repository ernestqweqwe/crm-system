import * as React from 'react'
import { FC, useRef, useState } from 'react'
import { creteTodoItem } from '../../api/todoService'
import './TaskForm.scss'

interface ITaskFormProps {
    updateTodoList: () => void
}

const TaskForm: FC<ITaskFormProps> = ({ updateTodoList }) => {
    const [title, setTitle] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleCreateTodoItem = async (e: React.FormEvent<HTMLFormElement>, title: string) => {
        e.preventDefault()
        if (!title.trim()) {
            inputRef.current?.reportValidity()
            return
        }

        await creteTodoItem(title).then(() => {
            setTitle('')
            updateTodoList()
        })
    }

    return (
        <form className="tasks-form" onSubmit={(e) => handleCreateTodoItem(e, title)}>
            <input
                className="input"
                placeholder="Enter your task... *"
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
