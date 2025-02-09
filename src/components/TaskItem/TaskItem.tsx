import { Todo } from '../../types/Itodo'
import './TaskItem.scss'
import MyButton from '../UI/MyButton/MyButton.tsx'
import { useRef, useState } from 'react'

interface ITaskItemProps {
    taskObject: Todo
    onDelete: (taskId: number) => Promise<void>
    onUpdate: (taskId: number, title: string, isDone: boolean) => void
}

const TaskItem = ({ taskObject, onDelete, onUpdate }: ITaskItemProps) => {
    const { isDone, title, id } = taskObject

    const [inputValue, setInputValue] = useState(title)
    const [readOnly, setReadOnly] = useState(true)
    const inputRef = useRef<null | HTMLInputElement>(null)

    return (
        <div className="task-item">
            <input
                onChange={() => id !== undefined && onUpdate(id, inputValue, !isDone)}
                type="checkbox"
                id="task-check"
                checked={isDone}
            />
            <label
                onClick={() => {
                    if (readOnly) setReadOnly(false)
                    if (inputRef.current !== null) inputRef.current.focus()
                }}
                className={`label ${isDone ? 'label-throw' : ''}`}
                htmlFor="task-item__check"
            >
                <input
                    ref={inputRef}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                    onBlur={(e) => {
                        if (e.target.className === 'btn__change') return

                        if (id !== undefined) {
                            onUpdate(id, inputValue, isDone)
                            setReadOnly(!readOnly)
                        }
                    }}
                    type="text"
                    value={inputValue}
                    readOnly={readOnly}
                />
            </label>
            <div className="task-item__btns">
                <MyButton
                    onClick={() => {
                        if (!readOnly) return
                        setReadOnly(false)
                        if (inputRef.current !== null) inputRef.current.focus()
                    }}
                    className="btn btn__change"
                />
                <MyButton
                    className="btn btn__delete"
                    onClick={() => id !== undefined && onDelete(id)}
                />
            </div>
        </div>
    )
}

export default TaskItem
