import MyButton from '../UI/MyButton/MyButton.tsx'
import { useRef, useState } from 'react'
import { Todo } from '../../types/ResponseTypes.ts'
import './TaskItem.scss'

interface ITaskItemProps {
    taskObject: Todo
    onDelete: (taskId: number) => void
    onUpdate: (taskId: number, title: string, isDone: boolean) => void
}

const TaskItem = ({ taskObject, onDelete, onUpdate }: ITaskItemProps) => {
    const { isDone, title, id } = taskObject

    const [inputValue, setInputValue] = useState(title)
    const [inputValueBefore, setInputValueBefore] = useState(title)
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
            <label className={`label ${isDone ? 'label-throw' : ''}`} htmlFor="task-item__check">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    ref={inputRef}
                    type="text"
                    readOnly={readOnly}
                />
            </label>
            <div className="task-item__btns">
                {readOnly ? (
                    <MyButton
                        onClick={() => {
                            if (!readOnly) return
                            setReadOnly(false)
                            if (inputRef.current !== null) inputRef.current.focus()
                        }}
                        className="btn btn__change"
                    />
                ) : (
                    <div className="task-item__btns--aditional">
                        <button
                            onClick={() => {
                                if (inputRef.current?.value && id) {
                                    setInputValue(inputRef.current?.value)
                                    setInputValueBefore(inputRef.current?.value)
                                    onUpdate(id, inputValue, isDone)
                                    setReadOnly(true)
                                }

                                if (inputValue.length === 0 && id) onDelete(id)
                            }}
                            className="btn btn__save"
                        ></button>
                        <button
                            className="btn btn__cancel"
                            onClick={() => {
                                setInputValue(inputValueBefore)
                                setReadOnly(true)
                            }}
                        ></button>
                    </div>
                )}
                <MyButton
                    className="btn btn__delete"
                    onClick={() => id !== undefined && onDelete(id)}
                />
            </div>
        </div>
    )
}

export default TaskItem
