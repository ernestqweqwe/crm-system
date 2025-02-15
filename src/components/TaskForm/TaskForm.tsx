import * as React from 'react'
import { FC, useRef, useState } from 'react'
import { creteTodoItem } from '../../api/todoService'
import './TaskForm.scss'

interface ITaskData {
    task: string
    executor: string
    description: string
}

interface ITaskFormProps {
    updateTodoList: () => void
}

const TaskForm: FC<ITaskFormProps> = ({ updateTodoList }) => {
    const [taskData, setTaskData] = useState<ITaskData>({ task: '', executor: '', description: '' })
    const inputRef = useRef<HTMLInputElement>(null)

    const handleCreateTodoItem = async (
        e: React.FormEvent<HTMLFormElement>,
        taskData: ITaskData
    ) => {
        e.preventDefault()

        if (!taskData.task.trim()) {
            inputRef.current?.reportValidity()
            return
        }

        await creteTodoItem(taskData.task, taskData.description, taskData.executor)

        setTaskData({ task: '', executor: '', description: '' })
        updateTodoList()
    }

    return (
        <form className="tasks-form" onSubmit={(e) => handleCreateTodoItem(e, taskData)}>
            <div className="inputs-container">
                <input
                    className="input"
                    placeholder="Enter your task... *"
                    minLength={2}
                    maxLength={64}
                    required={true}
                    type="text"
                    ref={inputRef}
                    value={taskData.task}
                    onChange={(e) => setTaskData({ ...taskData, task: e.target.value })}
                />
                <input
                    value={taskData.executor}
                    onChange={(e) => setTaskData({ ...taskData, executor: e.target.value })}
                    className="input"
                    type="text"
                    placeholder="Executor"
                />
                <input
                    value={taskData.description}
                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    className="input"
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
