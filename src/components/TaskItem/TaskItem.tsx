import { useRef, useState } from 'react'
import { Todo } from '../../types/ResponseTypes.ts'
import { deleteTodo, updateTodo } from '../../api/todoService.ts'
import './TaskItem.scss'

interface ITaskItemProps {
    taskObject: Todo
    updateTodoList: () => void
}

const TaskItem = ({ taskObject, updateTodoList }: ITaskItemProps) => {
    console.log(taskObject)
    const { id, isDone, title, description, executor } = taskObject

    const inputValueBefore = { title, description, executor }
    const [inputValue, setInputValue] = useState({ title, description, executor })
    const [isEdetMode, setIsEdetMode] = useState<boolean>(false)
    const inputRefTitle = useRef<HTMLInputElement>(null)
    const inputRefDescription = useRef<HTMLInputElement>(null)
    const inputReExecutor = useRef<HTMLInputElement>(null)

    const handleDelete = async () => {
        await deleteTodo(id)
        updateTodoList()
    }

    const handleToggle = async () => {
        await updateTodo(!isDone, id, inputValue.title, inputValue.description, inputValue.executor)
        updateTodoList()
    }

    const handleSave = async () => {
        await updateTodo(isDone, id, inputValue.title, inputValue.description, inputValue.executor)
        updateTodoList()
        setIsEdetMode(false)
    }

    const handleCancel = async () => {
        setIsEdetMode(false)
        setInputValue(inputValueBefore)
    }

    const handelEdit = () => {
        setIsEdetMode(!isEdetMode)
        inputRefTitle.current?.focus()
    }

    return (
        <div className="task-item">
            <input onChange={handleToggle} type="checkbox" id="task-check" checked={isDone} />
            <div className="task-item__inputs-container">
                <input
                    value={inputValue.title}
                    onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })}
                    ref={inputRefTitle}
                    type="text"
                    readOnly={!isEdetMode}
                    className={isDone ? 'throw' : ''}
                />

                {isEdetMode && (
                    <>
                        <input
                            value={inputValue.description}
                            onChange={(e) =>
                                setInputValue({ ...inputValue, description: e.target.value })
                            }
                            ref={inputRefDescription}
                            type="text"
                            readOnly={!isEdetMode}
                            className={isDone ? 'throw' : ''}
                        />
                        <input
                            value={inputValue.executor}
                            onChange={(e) =>
                                setInputValue({ ...inputValue, executor: e.target.value })
                            }
                            ref={inputReExecutor}
                            type="text"
                            readOnly={!isEdetMode}
                            className={isDone ? 'throw' : ''}
                        />
                    </>
                )}
            </div>
            <div className="task-item__btns">
                {!isEdetMode ? (
                    <>
                        <button className="btn btn__change" onClick={handelEdit}>
                            Edit
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
