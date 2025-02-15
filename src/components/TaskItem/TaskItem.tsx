import { useRef, useState } from 'react'
import { Todo } from '../../types/ResponseTypes.ts'
import { deleteTodo, updateTodo } from '../../api/todoService.ts'
import './TaskItem.scss'

interface ITaskItemProps {
    taskObject: Todo
    updateTodoList: () => void
}

const TaskItem = ({ taskObject, updateTodoList }: ITaskItemProps) => {
    const { isDone, title, id } = taskObject

    const inputValueBefore = title
    const [inputValue, setInputValue] = useState(title)
    const [isEditMode, setIsEdetMode] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDelete = async () => {
        await deleteTodo(id)
        updateTodoList()
    }

    const handleToggle = async () => {
        await updateTodo(id, title, !isDone)
        updateTodoList()
    }

    const handleSave = async () => {
        if (!inputRef.current?.value) return
        await updateTodo(id, inputRef.current?.value, isDone)
        updateTodoList()
        setIsEdetMode(false)
    }

    const handleCancel = async () => {
        setIsEdetMode(false)
        setInputValue(inputValueBefore)
    }

    return (
        <div className="task-item">
            <input onChange={handleToggle} type="checkbox" id="task-check" checked={isDone} />
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                ref={inputRef}
                type="text"
                readOnly={!isEditMode}
            />
            <div className="task-item__btns">
                {!isEditMode ? (
                    <>
                        <button
                            className="btn btn__change"
                            onClick={() => {
                                setIsEdetMode(!isEditMode)
                                inputRef.current?.focus()
                            }}
                        >
                            Change
                        </button>
                    </>
                ) : (
                    <div className="task-item__btns--aditional">
                        <button className="btn btn__save" onClick={handleSave}>
                            Save
                        </button>
                        <button className="btn btn__cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                )}

                <button className="btn btn__delete" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TaskItem
