import { deleteTask, updateTask } from 'api/todoService'
import { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import './TaskItem.scss'
import { Todo } from 'types/Itodo'

interface ITaskItemProps {
    taskObject: Todo
    updateData: () => void
}

interface values {
    title: string
    isDone: boolean
}

const TaskItem = ({ taskObject, updateData }: ITaskItemProps) => {
    const { isDone, title, id } = taskObject
    const [changeButtonPressed, setChangeButtonPressed] = useState(false)
    const [checkBoxPressed, setCheckboxPressed] = useState(isDone)
    const [form] = useForm()

    const onToggle = async () => {
        setCheckboxPressed(!checkBoxPressed)
        await updateTask(id, title, !checkBoxPressed).then(() => updateData())
    }

    const onSave = async () => {
        setChangeButtonPressed(false)
        const values: values = form.getFieldsValue()
        if (values.title !== title) {
            await updateTask(id, values.title, checkBoxPressed).then(() => updateData())
        }
    }

    const onCancel = () => {
        setChangeButtonPressed(false)
        form.setFieldValue('title', title)
    }

    const onDelete = async (taskId: number) => {
        await deleteTask(taskId).then(() => updateData())
    }

    const onChange = () => {
        setChangeButtonPressed(true)
    }

    return (
        <Form layout="inline" className="task-item" form={form} initialValues={{ title, isDone }}>
            <Form.Item name="isDone" valuePropName="checked">
                <Checkbox onClick={onToggle} />
            </Form.Item>
            <Form.Item name="title" rules={[{ min: 2 }, { max: 64 }, { required: true }]}>
                <Input
                    disabled={!changeButtonPressed}
                    className={checkBoxPressed ? 'task-input through' : 'task-input'}
                />
            </Form.Item>
            <Form.Item>
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
                        <Button size="middle" type="primary" onClick={onChange}>
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
