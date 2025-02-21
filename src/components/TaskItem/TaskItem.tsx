import { Todo } from '../../types/Itodo'
import { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import './TaskItem.scss'
import { useForm } from 'antd/es/form/Form'

interface ITaskItemProps {
    taskObject: Todo
    onDelete: (taskId: number) => void
    onUpdate: (taskId: number, title: string, isDone: boolean) => void
}

interface values {
    title: string
    isDone: boolean
}

const TaskItem = ({ taskObject, onDelete, onUpdate }: ITaskItemProps) => {
    const { isDone, title, id } = taskObject
    const [changeButtonPressed, setChangeButtonPressed] = useState(false)
    const [checkBoxPressed, setcheckBoxPressedPressed] = useState(isDone)
    const [form] = useForm()

    return (
        <Form layout="inline" className="task-item" form={form} initialValues={{ title, isDone }}>
            <Form.Item name="isDone" valuePropName="checked">
                <Checkbox
                    onClick={() => {
                        setcheckBoxPressedPressed(!checkBoxPressed)
                        onUpdate(id, title, !checkBoxPressed)
                    }}
                />
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
                        <Button
                            size="middle"
                            type="primary"
                            onClick={() => {
                                setChangeButtonPressed(false)
                                const values: values = form.getFieldsValue()
                                if (values.title !== title) {
                                    onUpdate(id, values.title, values.isDone)
                                }
                            }}
                        >
                            Save
                        </Button>

                        <Button
                            size="middle"
                            type="primary"
                            style={{ marginLeft: 10 }}
                            onClick={() => {
                                setChangeButtonPressed(false)
                                form.setFieldValue('title', title)
                            }}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button
                        size="middle"
                        type="primary"
                        onClick={() => setChangeButtonPressed(true)}
                    >
                        Change
                    </Button>
                )}
                <Button
                    size="middle"
                    type="primary"
                    danger
                    onClick={() => onDelete(id)}
                    style={{ marginLeft: 10 }}
                >
                    Delete
                </Button>
            </Form.Item>
        </Form>
    )
}

export default TaskItem
