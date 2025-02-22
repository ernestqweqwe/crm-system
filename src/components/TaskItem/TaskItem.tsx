import { Todo } from '../../types/Itodo'
import { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import './TaskItem.scss'
import { deleteTask, updateTask } from '../../api/todoService.ts'

interface ITaskItemProps {
    taskObject: Todo
    updateData: () => void
    setError: (error: Error) => void
}

interface values {
    title: string
    isDone: boolean
}

const TaskItem = ({ taskObject, updateData, setError }: ITaskItemProps) => {
    const { isDone, title, id } = taskObject
    const [changeButtonPressed, setChangeButtonPressed] = useState(false)
    const [checkBoxPressed, setCheckboxPressed] = useState(isDone)
    const [form] = useForm()

    const onToggle = async () => {
        setCheckboxPressed(!checkBoxPressed)
        await updateTask(id, title, !checkBoxPressed)
            .then(() => updateData())
            .catch(setError)
    }

    const onSave = async () => {
        setChangeButtonPressed(false)
        const values: values = form.getFieldsValue()
        await updateTask(id, values.title, checkBoxPressed)
            .then(() => updateData())
            .catch(setError)
    }

    const onCancel = () => {
        setChangeButtonPressed(false)
        form.setFieldValue('title', title)
    }

    const onDelete = async (taskId: number) => {
        await deleteTask(taskId)
            .then(() => updateData())
            .catch(setError)
    }

    return (
        <Form layout="inline" className="task-item" form={form} initialValues={{ title, isDone }}>
            <Form.Item name="isDone" valuePropName="checked">
                <Checkbox onClick={onToggle} />
            </Form.Item>
            <Form.Item
                style={{ width: 500 }}
                name="title"
                rules={[{ min: 2 }, { max: 64 }, { required: true }]}
            >
                <Input
                    disabled={!changeButtonPressed}
                    className={checkBoxPressed ? 'through' : ''}
                />
            </Form.Item>
            <Form.Item style={{ width: 230 }}>
                {changeButtonPressed ? (
                    <>
                        <Button size="middle" type="primary" onClick={onSave}>
                            Save
                        </Button>

                        <Button
                            size="middle"
                            type="primary"
                            style={{ marginLeft: 10 }}
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            size="middle"
                            type="primary"
                            onClick={() => setChangeButtonPressed(true)}
                        >
                            Change
                        </Button>

                        <Button
                            size="middle"
                            type="primary"
                            danger
                            onClick={() => onDelete(id)}
                            style={{ marginLeft: 10 }}
                        >
                            Delete
                        </Button>
                    </>
                )}{' '}
            </Form.Item>
        </Form>
    )
}

export default TaskItem
