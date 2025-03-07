import { DeleteOutlined, EditOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons'
import { deleteTask, updateTask } from 'api/taskService'
import { MAX_TASK_LENGTH, MIN_TASK_LENGTH } from 'src/constants'
import { useState } from 'react'
import { Button, Checkbox, Form, Input, Space } from 'antd'
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
    const [isEdit, setIsEdit] = useState(false)
    const [checkBoxPressed, setCheckboxPressed] = useState(isDone)
    const [form] = useForm()

    const onToggle = async () => {
        setCheckboxPressed(!checkBoxPressed)
        await updateTask(id, title, !checkBoxPressed)
        updateData()
    }

    const onSubmit = async () => {
        setIsEdit(false)
        const values: values = form.getFieldsValue()
        if (values.title !== title) {
            await updateTask(id, values.title, checkBoxPressed)
            updateData()
        }
    }

    const onCancel = () => {
        setIsEdit(false)
        form.resetFields(['title'])
    }

    const onDelete = async (taskId: number) => {
        await deleteTask(taskId)
        updateData()
    }

    const onChange = () => {
        setIsEdit(true)
    }

    return (
        <Form layout="inline" className="task-item" form={form} initialValues={{ title, isDone }}>
            <Form.Item name="isDone" valuePropName="checked">
                <Checkbox onClick={onToggle} />
            </Form.Item>
            <Form.Item
                name="title"
                rules={[{ min: MIN_TASK_LENGTH }, { max: MAX_TASK_LENGTH }, { required: true }]}
                style={{ flexGrow: 1 }}
            >
                <Input
                    disabled={!isEdit}
                    className={checkBoxPressed ? 'task-input through' : 'task-input'}
                />
            </Form.Item>
            <Form.Item>
                <Space>
                    {isEdit ? (
                        <>
                            <Button size="middle" type="primary" onClick={onSubmit}>
                                <SaveOutlined />
                            </Button>

                            <Button size="middle" type="primary" onClick={onCancel}>
                                <RollbackOutlined />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button size="middle" type="primary" onClick={onChange}>
                                <EditOutlined />
                            </Button>
                            <Button
                                size="middle"
                                type="primary"
                                danger
                                onClick={() => onDelete(id)}
                            >
                                <DeleteOutlined />
                            </Button>
                        </>
                    )}{' '}
                </Space>
            </Form.Item>
        </Form>
    )
}

export default TaskItem
